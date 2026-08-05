"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Logo } from "@/components/Logo";
import { PERSONAS, type Persona } from "@/lib/company";
import { useVoice } from "./useVoice";

type ChatMessage = { role: "user" | "assistant"; content: string };
type Histories = Record<string, ChatMessage[]>;

const STANDUP_PROMPT = "Give me your 15-second daily standup report.";

async function askAgent(personaId: string, messages: ChatMessage[]): Promise<string> {
  const response = await fetch("/api/agent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ personaId, messages }),
  });
  if (!response.ok) {
    throw new Error(`Agent request failed (${response.status})`);
  }
  const data = (await response.json()) as { reply: string };
  return data.reply;
}

function PersonaCard({
  persona,
  selected,
  busy,
  onSelect,
}: {
  persona: Persona;
  selected: boolean;
  busy: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-lg border p-3 text-left transition-colors duration-150 ${
        selected
          ? "border-accent bg-surface shadow-[0_2px_10px_rgba(20,41,63,0.08)]"
          : "border-rule bg-surface hover:border-rule-hover"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-[22px]" aria-hidden>
          {persona.emoji}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold text-ink">
            {persona.name}
            {busy && <span className="ml-2 text-accent-deep">●</span>}
          </p>
          <p className="truncate text-[12.5px] text-muted">{persona.role}</p>
        </div>
      </div>
      <p className="mt-2 text-[12px] leading-snug text-muted-3">
        {persona.metrics[0].label}: <span className="font-medium text-list">{persona.metrics[0].value}</span>
      </p>
    </button>
  );
}

export function Boardroom() {
  const [selectedId, setSelectedId] = useState<string>(PERSONAS[0].id);
  const [histories, setHistories] = useState<Histories>({});
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [standupActive, setStandupActive] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    sttSupported,
    ttsSupported,
    listening,
    speaking,
    interim,
    speak,
    cancelSpeech,
    startListening,
    stopListening,
  } = useVoice();

  const selected = PERSONAS.find((p) => p.id === selectedId) ?? PERSONAS[0];
  const messages = histories[selected.id] ?? [];
  const busy = pendingId !== null || standupActive;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [histories, selectedId, interim]);

  const appendMessage = useCallback((personaId: string, message: ChatMessage) => {
    setHistories((prev) => ({
      ...prev,
      [personaId]: [...(prev[personaId] ?? []), message],
    }));
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || pendingId || standupActive) return;
      const persona = PERSONAS.find((p) => p.id === selectedId) ?? PERSONAS[0];
      cancelSpeech();
      setDraft("");
      appendMessage(persona.id, { role: "user", content });
      setPendingId(persona.id);
      try {
        const history = [...(histories[persona.id] ?? []), { role: "user" as const, content }];
        const reply = await askAgent(persona.id, history);
        appendMessage(persona.id, { role: "assistant", content: reply });
        if (autoSpeak && ttsSupported) {
          void speak(reply, persona.voice);
        }
      } catch {
        appendMessage(persona.id, {
          role: "assistant",
          content: "Sorry — I dropped off the call for a second. Ask me that again?",
        });
      } finally {
        setPendingId(null);
      }
    },
    [appendMessage, autoSpeak, cancelSpeech, histories, pendingId, selectedId, speak, standupActive, ttsSupported],
  );

  const runStandup = useCallback(async () => {
    if (busy) return;
    cancelSpeech();
    setStandupActive(true);
    try {
      for (const persona of PERSONAS) {
        setSelectedId(persona.id);
        setPendingId(persona.id);
        appendMessage(persona.id, { role: "user", content: STANDUP_PROMPT });
        let reply: string;
        try {
          reply = await askAgent(persona.id, [{ role: "user", content: STANDUP_PROMPT }]);
        } catch {
          reply = "I lost the connection mid-standup — catch me afterwards.";
        }
        appendMessage(persona.id, { role: "assistant", content: reply });
        setPendingId(null);
        if (autoSpeak && ttsSupported) {
          await speak(`${persona.name}, ${persona.role}. ${reply}`, persona.voice);
        }
      }
    } finally {
      setPendingId(null);
      setStandupActive(false);
    }
  }, [appendMessage, autoSpeak, busy, cancelSpeech, speak, ttsSupported]);

  const toggleMic = useCallback(() => {
    if (listening) {
      stopListening();
    } else {
      cancelSpeech();
      startListening((transcript) => void sendMessage(transcript));
    }
  }, [cancelSpeech, listening, sendMessage, startListening, stopListening]);

  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <header className="sticky top-0 z-50 border-b border-rule bg-[rgba(251,250,249,0.92)] backdrop-blur-[10px]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-[clamp(20px,4vw,48px)] py-4">
          <Link href="/" className="flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.01em] text-ink">
            <Logo />
            CoreTechitect
            <span className="rounded-full border border-rule bg-surface-alt px-2.5 py-0.5 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-accent-deep">
              Agentic HQ
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-[13px] text-muted">
              <input
                type="checkbox"
                checked={autoSpeak}
                onChange={(e) => setAutoSpeak(e.target.checked)}
                className="accent-[var(--accent)]"
              />
              Speak replies
            </label>
            <button
              type="button"
              onClick={runStandup}
              disabled={busy}
              className="inline-flex h-9 items-center rounded-md bg-navy px-4 text-[13.5px] font-semibold text-bg transition-colors duration-150 hover:bg-navy-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {standupActive ? "Standup running…" : "▶ All-hands standup"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-6 px-[clamp(20px,4vw,48px)] py-6 min-[900px]:flex-row">
        <aside className="w-full shrink-0 min-[900px]:w-[300px]">
          <h1 className="font-serif text-[22px] font-semibold text-ink">The executive team</h1>
          <p className="mt-1 text-[13px] leading-snug text-muted">
            Every department is run by an agent. Pick an exec, talk with the mic, or run the all-hands standup.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {PERSONAS.map((persona) => (
              <PersonaCard
                key={persona.id}
                persona={persona}
                selected={persona.id === selectedId}
                busy={pendingId === persona.id}
                onSelect={() => setSelectedId(persona.id)}
              />
            ))}
          </div>
        </aside>

        <section className="flex min-h-[520px] flex-1 flex-col overflow-hidden rounded-lg border border-rule bg-surface">
          <div className="border-b border-rule-soft px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="text-[28px]" aria-hidden>
                {selected.emoji}
              </span>
              <div>
                <h2 className="text-[16px] font-semibold text-ink">
                  {selected.name}
                  <span className="ml-2 font-normal text-muted-2">· {selected.role}</span>
                </h2>
                <p className="text-[12.5px] text-muted-3">{selected.tagline}</p>
              </div>
              {speaking && (
                <button
                  type="button"
                  onClick={cancelSpeech}
                  className="ml-auto rounded-md border border-rule px-3 py-1 text-[12.5px] text-muted transition-colors hover:border-rule-hover hover:text-ink"
                >
                  ◼ Stop voice
                </button>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {selected.metrics.map((metric) => (
                <span
                  key={metric.label}
                  className="rounded-full border border-rule-soft bg-surface-alt px-2.5 py-1 text-[11.5px] text-list"
                >
                  {metric.label}: <strong className="font-semibold">{metric.value}</strong>
                  {metric.trend && <span className="text-muted-3"> · {metric.trend}</span>}
                </span>
              ))}
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {messages.length === 0 && (
              <p className="text-[13.5px] leading-relaxed text-muted-3">
                Open the line with {selected.name.split(" ")[0]} — try &ldquo;give me a status report&rdquo;,
                &ldquo;what are your priorities?&rdquo;, or &ldquo;what risks are you tracking?&rdquo;
              </p>
            )}
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-[14px] leading-relaxed ${
                    message.role === "user" ? "bg-navy text-bg" : "bg-surface-alt text-ink"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {pendingId === selected.id && (
              <p className="text-[13px] italic text-muted-3">{selected.name.split(" ")[0]} is thinking…</p>
            )}
            {listening && (
              <p className="text-[13px] italic text-accent-deep">🎙 Listening… {interim}</p>
            )}
          </div>

          <form
            className="flex items-center gap-2 border-t border-rule-soft px-4 py-3"
            onSubmit={(e) => {
              e.preventDefault();
              void sendMessage(draft);
            }}
          >
            <button
              type="button"
              onClick={toggleMic}
              disabled={!sttSupported || busy}
              title={sttSupported ? "Talk to this executive" : "Voice input needs Chrome or Edge"}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[18px] transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${
                listening
                  ? "border-accent bg-accent text-white"
                  : "border-rule bg-surface hover:border-rule-hover"
              }`}
            >
              {listening ? "◼" : "🎙"}
            </button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={
                sttSupported
                  ? `Speak or type to ${selected.name.split(" ")[0]}…`
                  : `Type to ${selected.name.split(" ")[0]}…`
              }
              disabled={busy}
              className="h-10 flex-1 rounded-md border border-rule bg-bg px-3 text-[14px] text-ink outline-none transition-colors focus:border-accent disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={busy || draft.trim().length === 0}
              className="inline-flex h-10 items-center rounded-md bg-navy px-4 text-[14px] font-semibold text-bg transition-colors duration-150 hover:bg-navy-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
