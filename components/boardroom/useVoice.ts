"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import type { VoiceProfile } from "@/lib/company";

// Minimal typings for the Web Speech API's recognition side, which isn't in
// the standard TS DOM lib (Chrome exposes it as webkitSpeechRecognition).
type RecognitionResultEvent = {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
};

type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: RecognitionResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type RecognitionConstructor = new () => Recognition;

function getRecognitionConstructor(): RecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

// Feature detection via useSyncExternalStore: false during SSR, real value on
// the client without a setState-in-effect.
const noopSubscribe = () => () => {};

export function useVoice() {
  const sttSupported = useSyncExternalStore(
    noopSubscribe,
    () => getRecognitionConstructor() !== null,
    () => false,
  );
  const ttsSupported = useSyncExternalStore(
    noopSubscribe,
    () => "speechSynthesis" in window,
    () => false,
  );
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [interim, setInterim] = useState("");
  const recognitionRef = useRef<Recognition | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
    if (!synth) return;
    const loadVoices = () => {
      voicesRef.current = synth.getVoices();
    };
    loadVoices();
    synth.addEventListener("voiceschanged", loadVoices);
    return () => {
      synth.removeEventListener("voiceschanged", loadVoices);
      synth.cancel();
      recognitionRef.current?.abort();
    };
  }, []);

  const pickVoice = useCallback((profile: VoiceProfile): SpeechSynthesisVoice | null => {
    const voices = voicesRef.current.filter((v) => v.lang.toLowerCase().startsWith("en"));
    const pool = voices.length > 0 ? voices : voicesRef.current;
    for (const fragment of profile.preferredVoices) {
      const match = pool.find((v) => v.name.toLowerCase().includes(fragment));
      if (match) return match;
    }
    return pool[0] ?? null;
  }, []);

  const cancelSpeech = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string, profile: VoiceProfile): Promise<void> => {
      const synth = window.speechSynthesis;
      if (!synth) return Promise.resolve();
      synth.cancel();
      return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        const voice = pickVoice(profile);
        if (voice) utterance.voice = voice;
        utterance.pitch = profile.pitch;
        utterance.rate = profile.rate;
        utterance.onend = () => {
          setSpeaking(false);
          resolve();
        };
        utterance.onerror = () => {
          setSpeaking(false);
          resolve();
        };
        setSpeaking(true);
        synth.speak(utterance);
      });
    },
    [pickVoice],
  );

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const startListening = useCallback(
    (onFinal: (transcript: string) => void) => {
      const Ctor = getRecognitionConstructor();
      if (!Ctor || recognitionRef.current) return;
      const recognition = new Ctor();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = true;
      let finalTranscript = "";
      recognition.onresult = (event) => {
        let interimText = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) finalTranscript += result[0].transcript;
          else interimText += result[0].transcript;
        }
        setInterim(interimText);
      };
      recognition.onerror = () => {
        // Treat mic errors like an empty result; onend does the cleanup.
      };
      recognition.onend = () => {
        recognitionRef.current = null;
        setListening(false);
        setInterim("");
        const text = finalTranscript.trim();
        if (text) onFinal(text);
      };
      recognitionRef.current = recognition;
      setListening(true);
      setInterim("");
      recognition.start();
    },
    [],
  );

  return {
    sttSupported,
    ttsSupported,
    listening,
    speaking,
    interim,
    speak,
    cancelSpeech,
    startListening,
    stopListening,
  };
}
