// Offline fallback brain: deterministic, persona-aware replies built from the
// simulated business state. Used when no ANTHROPIC_API_KEY is configured (or a
// live call fails) so the boardroom always works.

import { getPersona, type Persona } from "./company";

function metricsLine(p: Persona): string {
  return p.metrics
    .map((m) => `${m.label.toLowerCase()} at ${m.value}${m.trend ? ` (${m.trend})` : ""}`)
    .join(", ");
}

function standup(p: Persona): string {
  return `${p.department} standup: ${metricsLine(p)}. Top priority right now: ${p.priorities[0].toLowerCase()}. One watch item: ${p.risks[0].toLowerCase()}.`;
}

function report(p: Persona): string {
  return `Here's where ${p.department} stands. ${p.metrics
    .map((m) => `${m.label} is ${m.value}${m.trend ? `, ${m.trend}` : ""}`)
    .join(". ")}. Overall I'd call it healthy, with one thing I'm watching: ${p.risks[0].toLowerCase()}. Ask me about priorities or risks if you want to go deeper.`;
}

function priorities(p: Persona): string {
  return `My top three priorities this quarter: first, ${p.priorities[0].toLowerCase()}. Second, ${p.priorities[1].toLowerCase()}. Third, ${p.priorities[2].toLowerCase()}.`;
}

function risks(p: Persona): string {
  return `Two things keep me honest right now. One: ${p.risks[0].toLowerCase()}. Two: ${p.risks[1].toLowerCase()}. Neither is a fire yet, but both are on my weekly review.`;
}

function intro(p: Persona): string {
  return `I'm ${p.name}, ${p.role} at CoreTechitect. I own ${p.department.toLowerCase()} — ${p.tagline.toLowerCase()} Ask me for a status report, my priorities, or the risks I'm tracking.`;
}

const INTENTS: { pattern: RegExp; handler: (p: Persona) => string }[] = [
  { pattern: /standup|stand-up|daily|check[- ]?in|15[- ]?second/i, handler: standup },
  { pattern: /priorit|focus|plan|roadmap|goal|okr|next/i, handler: priorities },
  { pattern: /risk|worried|concern|problem|blocker|issue|threat/i, handler: risks },
  { pattern: /who are you|introduce|your role|what do you do/i, handler: intro },
  {
    pattern: /report|status|update|how (are|is)|numbers|metric|kpi|performance|revenue|pipeline|cash|headcount|utilization/i,
    handler: report,
  },
  {
    pattern: /^(hi|hey|hello|good (morning|afternoon|evening))\b/i,
    handler: (p) =>
      `Good to see you. ${p.department} is in decent shape — ${p.metrics[0].label.toLowerCase()} is at ${p.metrics[0].value}. Want the full report?`,
  },
  {
    pattern: /thank|great|good job|nice/i,
    handler: (p) => `Appreciated. I'll keep ${p.department.toLowerCase()} moving — flag me anytime.`,
  },
];

export function offlineReply(personaId: string, userText: string): string {
  const p = getPersona(personaId);
  if (!p) {
    return "I couldn't find that executive on the org chart.";
  }
  for (const intent of INTENTS) {
    if (intent.pattern.test(userText)) {
      return intent.handler(p);
    }
  }
  return `Noted. From the ${p.department} seat, the short version: ${metricsLine(p)}. If you want, ask me for a status report, my priorities, or current risks — or connect an Anthropic API key to unlock free-form conversation.`;
}
