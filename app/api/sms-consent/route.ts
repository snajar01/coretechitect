import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const record = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};
  const digits = String(record.phone ?? "").replace(/\D/g, "");
  const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;

  if (national.length !== 10) {
    return NextResponse.json({ error: "Enter a valid 10-digit US mobile number." }, { status: 400 });
  }
  if (record.consent !== true) {
    return NextResponse.json({ error: "Check the consent box to enable text alerts." }, { status: 400 });
  }

  // No SMS provider is wired up on this site yet. This validates the consent
  // and acknowledges it. Only the last four digits are logged.
  console.log(JSON.stringify({ event: "sms_consent", phoneLast4: national.slice(-4), at: new Date().toISOString() }));

  return NextResponse.json({ ok: true });
}
