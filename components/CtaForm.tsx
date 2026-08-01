"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function CtaForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string) ?? "";
    const email = (data.get("email") as string) ?? "";
    const message = (data.get("message") as string) ?? "";

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const busy = status === "submitting" || status === "success";
  const note =
    status === "success"
      ? "Thank you — we will be in touch shortly."
      : status === "error"
        ? errorMessage
        : "We reply within one business day.";

  const fieldClass =
    "rounded-md border border-navy-line bg-navy-deep px-4 font-sans text-[15px] text-cta-fg placeholder:text-on-dark-hint focus:border-accent focus:outline-none disabled:opacity-70";
  const labelClass = "text-[13px] text-on-dark-body";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full max-w-[460px] justify-self-start gap-3 md:justify-self-end"
    >
      <label htmlFor="name" className={labelClass}>
        Full name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        required
        placeholder="Jane Doe"
        disabled={busy}
        className={`h-[50px] ${fieldClass}`}
      />
      <label htmlFor="email" className={labelClass}>
        Work email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        placeholder="you@company.com"
        disabled={busy}
        className={`h-[50px] ${fieldClass}`}
      />
      <label htmlFor="message" className={labelClass}>
        What can we help with? <span className="text-on-dark-hint">(optional)</span>
      </label>
      <textarea
        id="message"
        name="message"
        rows={3}
        placeholder="A sentence or two on your data estate."
        disabled={busy}
        className={`resize-none py-3 ${fieldClass}`}
      />
      <div className="flex flex-wrap items-center gap-3.5">
        <button
          type="submit"
          disabled={busy}
          className="h-[50px] rounded-md bg-accent px-[26px] font-sans text-[15.5px] font-semibold text-white transition-colors duration-150 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Request the audit"}
        </button>
        <span
          role="status"
          aria-live="polite"
          className={`text-[13.5px] ${status === "error" ? "text-accent" : "text-on-dark-hint"}`}
        >
          {note}
        </span>
      </div>
    </form>
  );
}
