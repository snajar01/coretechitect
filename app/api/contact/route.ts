import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body === "object" && body !== null && "email" in body ? String((body as { email: unknown }).email ?? "") : "";

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid work email." }, { status: 400 });
  }

  // TODO: no email-delivery provider is wired up yet (e.g. Resend). Wire a
  // real send here once an API key exists — until then this only validates
  // and acknowledges the submission.
  console.log(JSON.stringify({ event: "audit_request", email }));

  return NextResponse.json({ ok: true });
}
