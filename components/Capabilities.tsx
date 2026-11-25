import { AdvisoryIcon, CodeIcon, PlatformIcon, ScienceIcon } from "./icons";
import { Reveal } from "./Reveal";

const CARDS = [
  {
    kicker: "01 — Data",
    title: "Data foundation & migration",
    body: "Move off legacy systems onto a modern, governed data platform that every team can trust, and keep it reconciled and monitored.",
    icon: PlatformIcon,
    items: [
      "Legacy-to-modern migration",
      "Warehouse, pipelines, and modeling",
      "Governance, lineage, access control",
      "Reconciliation and data-quality monitoring",
    ],
  },
  {
    kicker: "02 — AI",
    title: "AI, analytics & automation",
    body: "Put your data to work: AI agents and automated workflows in production, with forecasting and reporting grounded in the same foundation.",
    icon: ScienceIcon,
    items: [
      "AI agents and LLM-powered features",
      "Workflow and process automation",
      "Forecasting and predictive models",
      "Executive and operational reporting",
    ],
  },
  {
    kicker: "03 — Software",
    title: "Systems, web & cloud",
    body: "Design and build the software your business runs on, from system architecture and websites to the cloud and integrations underneath.",
    icon: CodeIcon,
    items: [
      "System design and custom software",
      "Web design and development",
      "Cloud setup and migration",
      "Integrations and DevOps",
    ],
  },
] as const;

const ADVISORY_ITEMS = ["Technology strategy and roadmap", "Platform and vendor selection", "Team design and hiring"];

const iconTileClass =
  "relative flex h-12 w-12 items-center justify-center rounded-lg border border-rule bg-surface-alt text-accent-deep transition-colors duration-200 group-hover:border-accent-deep group-hover:bg-accent-deep group-hover:text-bg";
const cardClass =
  "group relative h-full overflow-hidden rounded-xl border border-rule bg-surface px-[26px] pb-[30px] pt-7 transition-all duration-200 hover:-translate-y-1 hover:border-rule-hover hover:shadow-[0_16px_32px_-20px_rgba(0,0,0,0.5)]";
const kickerClass = "text-xs font-bold uppercase tracking-[0.1em] text-accent-deep";

export function Capabilities() {
  return (
    <section id="capabilities" className="relative overflow-hidden">
      <div className="accent-shape accent-shape-3" />
      <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)] py-[clamp(48px,6vw,80px)]">
        <Reveal className="mb-[clamp(32px,4vw,48px)] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-6">
          <h2 className="max-w-[16ch] font-serif text-[clamp(28px,3.6vw,46px)] font-normal leading-[1.1] tracking-[-0.02em] text-ink">
            What we are engaged to do
          </h2>
          <p className="max-w-[46ch] justify-self-start text-[15.5px] leading-[1.6] text-muted-2 md:justify-self-end">
            Three practices, one engagement. Start where the need is most urgent, and build the rest on the same
            foundation.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={i} className="h-full">
              <article className={cardClass}>
                <card.icon
                  size={128}
                  className="pointer-events-none absolute -bottom-6 -right-6 -rotate-6 text-ink opacity-[0.05] transition-opacity duration-200 group-hover:opacity-[0.09]"
                />
                <div className={iconTileClass}>
                  <card.icon />
                </div>
                <div className={`relative mt-4 ${kickerClass}`}>{card.kicker}</div>
                <h3 className="relative mb-2.5 mt-3.5 text-[22px] font-semibold tracking-[-0.01em] text-ink">
                  {card.title}
                </h3>
                <p className="relative mb-[18px] text-[14.5px] leading-[1.6] text-muted-2">{card.body}</p>
                <ul className="relative grid gap-2 text-sm text-list">
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
        <Reveal className="mt-5">
          <article className={`${cardClass} flex flex-wrap items-center gap-x-10 gap-y-5`}>
            <div className={iconTileClass}>
              <AdvisoryIcon />
            </div>
            <div className="relative min-w-[260px] flex-1">
              <div className={kickerClass}>Advisory</div>
              <h3 className="mb-1.5 mt-2 text-[22px] font-semibold tracking-[-0.01em] text-ink">
                Fractional technology leadership
              </h3>
              <p className="max-w-[52ch] text-[14.5px] leading-[1.6] text-muted-2">
                Senior judgment on retainer, without carrying a full-time executive.
              </p>
            </div>
            <ul className="relative grid gap-2 text-sm text-list">
              {ADVISORY_ITEMS.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="text-accent">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
