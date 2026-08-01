import { Reveal } from "./Reveal";

// Illustrative placeholders supplied by the design, not audited client
// results — confirm or replace with real figures before launch.
const STATS = [
  { label: "Manual reporting hours per week", value: "22 → 2" },
  { label: "Time to define a new metric", value: "3 wks → 1 day" },
  { label: "Disputed figures in board decks", value: "None" },
  { label: "Stack ownership", value: "100% client" },
];

export function Outcomes() {
  return (
    <section id="outcomes" className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)] py-[clamp(48px,6vw,84px)]">
      <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(28px,4vw,64px)]">
        <div>
          <div className="mb-5 text-[12.5px] font-bold uppercase tracking-[0.11em] text-accent-deep">
            In practice
          </div>
          <p className="text-pretty font-serif text-[clamp(21px,2.2vw,29px)] leading-[1.34] text-navy">
            “We stopped guessing. Six weeks in, the leadership team was reading the same numbers off the same
            system for the first time since we founded the company.”
          </p>
          <p className="mt-5 text-sm text-muted-2">Operating partner · consumer nutrition brand</p>
        </div>
        <div className="grid gap-0 rounded-lg border border-rule bg-surface px-6 py-2">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex items-baseline justify-between gap-5 py-4 ${
                i < STATS.length - 1 ? "border-b border-rule-soft" : ""
              }`}
            >
              <span className="text-[14.5px] text-muted-2">{stat.label}</span>
              <span className="whitespace-nowrap font-serif text-[22px] text-navy">{stat.value}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
