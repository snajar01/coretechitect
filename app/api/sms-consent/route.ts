import { NextResponse } from "next/server";

function normalizeUsNumber(input: string): string {
  const digits = input.replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const record = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
  const phone = normalizeUsNumber(String(record.phone ?? ""));

  if (phone.length !== 10) {
    return NextResponse.json({ error: "Enter a valid 10-digit US mobile number." }, { status: 400 });
  }
  if (record.consent !== true) {
    return NextResponse.json({ error: "Check the consent box to enable text alerts." }, { status: 400 });
  }

  // This program has a single recipient: the business owner. The owner's number
  // lives in the SMS_OWNER_PHONE environment variable (never committed). If it is
  // not set, or the number does not match, nobody can be enrolled.
  const owner = normalizeUsNumber(process.env.SMS_OWNER_PHONE ?? "");
  if (owner.length !== 10) {
    return NextResponse.json({ error: "Text alerts are not available right now." }, { status: 503 });
  }
  if (phone !== owner) {
    return NextResponse.json(
      { error: "This program is limited to the business owner. That number cannot be enrolled." },
      { status: 403 },
    );
  }

  // No SMS provider is wired up on this site yet. This validates the consent
  // and acknowledges it. Only the last four digits are logged.
  console.log(JSON.stringify({ event: "sms_consent", phoneLast4: phone.slice(-4), at: new Date().toISOString() }));

  return NextResponse.json({ ok: true });
}
