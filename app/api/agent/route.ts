import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

import { offlineReply } from "@/lib/agent-brain";
import { COMPANY_CONTEXT, PERSONAS, getPersona, type Persona } from "@/lib/company";

const MAX_HISTORY = 20;
const MAX_MESSAGE_LENGTH = 2000;

type ChatMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): ChatMessage[] | null {
  if (typeof body !== "object" || body === null || !Array.isArray((body as { messages?: unknown }).messages)) {
    return null;
  }
  const raw = (body as { messages: unknown[] }).messages;
  const messages: ChatMessage[] = [];
  for (const entry of raw.slice(-MAX_HISTORY)) {
    if (typeof entry !== "object" || entry === null) return null;
    const { role, content } = entry as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    if (content.length === 0 || content.length > MAX_MESSAGE_LENGTH) return null;
    messages.push({ role, content });
  }
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") return null;
  return messages;
}

function systemPrompt(persona: Persona): string {
  const peers = PERSONAS.filter((p) => p.id !== persona.id)
    .map((p) => `${p.name} (${p.role}, ${p.department})`)
    .join("; ");
  return `${COMPANY_CONTEXT}

You are ${persona.name}, ${persona.role} at CoreTechitect, owner of ${persona.department}.
Personality: ${persona.personality}

Your department's current numbers:
${persona.metrics.map((m) => `- ${m.label}: ${m.value}${m.trend ? ` (${m.trend})` : ""}`).join("\n")}

Your current priorities:
${persona.priorities.map((p) => `- ${p}`).join("\n")}

Risks you are tracking:
${persona.risks.map((r) => `- ${r}`).join("\n")}

Your executive peers: ${peers}. Refer questions outside your department to the right peer by name.

You are speaking in a live voice conversation with the founder. Replies are read
aloud by text-to-speech, so answer in 2-5 short spoken sentences of plain prose:
no markdown, no bullet lists, no headers. Ground every claim in the numbers
above; if asked something the data doesn't cover, say what you'd need to find out.
Stay in character.`;
}

async function claudeReply(persona: Persona, messages: ChatMessage[]): Promise<string> {
  const client = new Anthropic();
  const response = await client.beta.messages.create({
    model: "claude-opus-5",
    max_tokens: 2048,
    output_config: { effort: "low" },
    betas: ["server-side-fallback-2026-06-01"],
    fallbacks: [{ model: "claude-opus-4-8" }],
    system: systemPrompt(persona),
    messages,
  });

  if (response.stop_reason === "refusal") {
    return "I'd rather not get into that one — ask me about the business and I'm all yours.";
  }
  const text = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("")
    .trim();
  return text || offlineReply(persona.id, messages[messages.length - 1].content);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const personaId = typeof body === "object" && body !== null ? String((body as { personaId?: unknown }).personaId ?? "") : "";
  const persona = getPersona(personaId);
  if (!persona) {
    return NextResponse.json({ error: "Unknown persona." }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) {
    return NextResponse.json({ error: "Invalid messages." }, { status: 400 });
  }

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const reply = await claudeReply(persona, messages);
      return NextResponse.json({ reply, source: "claude" });
    } catch (error) {
      console.error("agent route: Claude call failed, falling back to simulation", error);
    }
  }

  const reply = offlineReply(persona.id, messages[messages.length - 1].content);
  return NextResponse.json({ reply, source: "simulated" });
}
