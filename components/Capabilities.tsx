import { AdvisoryIcon, PlatformIcon, ReliabilityIcon, ScienceIcon } from "./icons";
import { Reveal } from "./Reveal";

const CARDS = [
  {
    kicker: "01 — Platform",
    title: "Trusted, governed data platform",
    body: "Cloud-native warehouse architecture with a transformation layer on top — modeled, governed, and defined once so every team reads the same numbers.",
    icon: PlatformIcon,
    items: [
      "Governance, lineage, access control",
      "Ingestion, ELT, and dbt transformation",
      "Dimensional and semantic modeling",
      "Executive and operational reporting",
    ],
  },
  {
    kicker: "02 — Science",
    title: "Data science & applied AI",
    body: "Forecasting, segmentation, and agentic AI systems in production — grounded in the same governed platform, not a side pipeline nobody trusts.",
    icon: ScienceIcon,
    items: [
      "Demand and revenue forecasting",
      "Churn and propensity modeling",
      "Agentic workflows and AI automation",
      "Production ML deployment",
    ],
  },
  {
    kicker: "03 — Reliability",
    title: "Data reconciliation & monitoring",
    body: "Continuous reconciliation between source systems and the warehouse — plus monitoring that flags a broken pipeline or a drifted number before it reaches a board deck, not after.",
    icon: ReliabilityIcon,
    items: [
      "Source-to-target reconciliation",
      "Pipeline and data-quality monitoring",
      "Anomaly and freshness alerting",
      "Incident runbooks and on-call response",
    ],
  },
  {
    kicker: "04 — Advisory",
    title: "Fractional data leadership",
    body: "Senior judgment on retainer — roadmap, platform decisions, and hiring — without carrying a full-time executive.",
    icon: AdvisoryIcon,
    items: ["Data strategy and roadmap", "Platform and vendor selection", "Team design and hiring"],
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)] py-[clamp(48px,6vw,80px)]">
      <Reveal className="mb-[clamp(32px,4vw,48px)] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-6">
        <h2 className="max-w-[16ch] font-serif text-[clamp(28px,3.6vw,46px)] font-normal leading-[1.1] tracking-[-0.02em] text-navy">
          What we are engaged to do
        </h2>
        <p className="max-w-[46ch] justify-self-start text-[15.5px] leading-[1.6] text-muted-2 md:justify-self-end">
          Four practices, one engagement. Most clients begin with the platform and expand into the rest as the
          foundation proves out.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {CARDS.map((card, i) => (
          <Reveal key={card.title} index={i} className="h-full">
            <article className="group h-full rounded-lg border border-rule bg-surface px-[26px] pb-[30px] pt-7 transition-all duration-200 hover:-translate-y-1 hover:border-rule-hover hover:shadow-[0_16px_32px_-20px_rgba(20,41,63,0.35)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-rule bg-surface-alt text-accent-deep transition-colors duration-200 group-hover:border-accent-deep group-hover:bg-accent-deep group-hover:text-white">
                <card.icon />
              </div>
              <div className="mt-4 text-xs font-bold uppercase tracking-[0.1em] text-accent-deep">{card.kicker}</div>
              <h3 className="mb-2.5 mt-3.5 text-xl font-semibold tracking-[-0.01em] text-navy">{card.title}</h3>
              <p className="mb-[18px] text-[14.5px] leading-[1.6] text-muted-2">{card.body}</p>
              <ul className="grid gap-2 text-sm text-list">
                {card.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="text-accent">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
