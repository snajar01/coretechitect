import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;

function stringField(body: unknown, key: string): string {
  return typeof body === "object" && body !== null && key in body
    ? String((body as Record<string, unknown>)[key] ?? "").trim()
    : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = stringField(body, "name");
  const email = stringField(body, "email");
  const message = stringField(body, "message");

  if (!name || name.length > MAX_NAME_LENGTH) {
    return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid work email." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "That message is too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Never tell a visitor their message was sent when nothing was delivered.
    // Locally (no key) we just log so the form can be exercised.
    if (process.env.NODE_ENV !== "production") {
      console.log(JSON.stringify({ event: "audit_request_dev", name, email, message }));
      return NextResponse.json({ ok: true });
    }
    console.error("contact form: RESEND_API_KEY is not set; submission was not delivered");
    return NextResponse.json(
      { error: "We could not send your message right now. Please email contact@coretechitect.com." },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "contact@coretechitect.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "Core Techitect <noreply@coretechitect.com>";
  const subjectName = name.replace(/[\r\n]+/g, " ").slice(0, 80);

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New consultation request from ${subjectName}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message || "(no message)"}`,
      }),
    });
  } catch (error) {
    console.error("contact form: email request failed", error);
    response = new Response(null, { status: 502 });
  }

  if (!response.ok) {
    console.error("contact form: email provider rejected the message", response.status);
    return NextResponse.json(
      { error: "We could not send your message right now. Please email contact@coretechitect.com." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
