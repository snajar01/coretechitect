"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function SmsOptInForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [consent, setConsent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const phone = String(new FormData(form).get("phone") ?? "");

    setStatus("submitting");
    try {
      const response = await fetch("/api/sms-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, consent }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
      setConsent(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const busy = status === "submitting";
  const note =
    status === "success"
      ? "Thank you. You will receive a confirmation text shortly."
      : status === "error"
        ? errorMessage
        : "Nothing is sent until you check the box.";

  return (
    <form
      onSubmit={handleSubmit}
      className="my-7 grid gap-3 rounded-xl border border-rule-strong bg-surface p-7"
    >
      <label htmlFor="phone" className="text-[13px] text-list">
        Mobile phone number
      </label>
      <input
        id="phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        required
        placeholder="(555) 555-0123"
        disabled={busy}
        className="h-[50px] rounded-md border border-rule-strong bg-bg px-4 font-sans text-[15px] text-ink placeholder:text-muted-3 focus:border-accent focus:outline-none disabled:opacity-70"
      />
      <div className="mt-1.5 flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          disabled={busy}
          className="mt-1.5 h-[18px] w-[18px] flex-none accent-navy"
        />
        <label htmlFor="consent" className="text-[13.5px] leading-[1.6] text-list">
          By checking this box, you agree to receive recurring automated account notifications from Core Techitect at
          the number provided. Consent is not a condition of purchase. Msg frequency varies. Msg &amp; data rates may
          apply. Reply HELP for help, STOP to cancel.{" "}
          <a href="/privacy" className="text-[#7d9bff] underline">
            Privacy Policy
          </a>{" "}
          <a href="/terms" className="text-[#7d9bff] underline">
            Terms
          </a>
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-3.5">
        <button
          type="submit"
          disabled={!consent || busy}
          className="h-[46px] rounded-md bg-navy px-[22px] font-sans text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-navy-hover disabled:cursor-not-allowed disabled:opacity-45"
        >
          {busy ? "Sending..." : "Enable text alerts"}
        </button>
        <span
          role="status"
          aria-live="polite"
          className={`text-[13.5px] ${status === "error" ? "text-accent" : "text-muted-3"}`}
        >
          {note}
        </span>
      </div>
    </form>
  );
}
