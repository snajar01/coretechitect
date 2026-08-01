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

  // TODO: no email-delivery provider is wired up yet (e.g. Resend). Wire a
  // real send here once an API key exists — until then this only validates
  // and acknowledges the submission.
  console.log(JSON.stringify({ event: "audit_request", name, email, message }));

  return NextResponse.json({ ok: true });
}
