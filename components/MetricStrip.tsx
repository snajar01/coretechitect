import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

// Illustrative placeholders supplied by the design, not audited client
// results — confirm or replace with real figures before launch.
const METRICS = [
  { value: "14×", caption: "faster reporting cycles after warehouse migration" },
  { value: "1", caption: "source of truth your dashboards, reports, and AI tools all read from" },
  { value: "6 weeks", caption: "from kickoff to the first dashboard leadership trusts" },
  { value: "0", caption: "vendor lock-in — you own every line of the stack" },
];

export function MetricStrip() {
  return (
    <Reveal className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)] pb-[clamp(48px,6vw,88px)]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-y border-rule">
        {METRICS.map((metric, i) => (
          <div
            key={metric.caption}
            className={`py-[26px] ${
              i === 0 ? "pr-6" : i === METRICS.length - 1 ? "pl-6" : "px-6"
            }`}
          >
            <div className="font-serif text-[38px] leading-none text-navy">
              <CountUp value={metric.value} />
            </div>
            <div className="mt-2 text-sm leading-[1.5] text-muted-2">{metric.caption}</div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
