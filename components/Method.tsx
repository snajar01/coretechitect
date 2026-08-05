import { AuditIcon, BuildIcon, TransferIcon } from "./icons";
import { Reveal } from "./Reveal";

const PHASES = [
  {
    label: "Phase 01 · Weeks 1–2",
    title: "Audit",
    body: "We map every source, every recurring report, and every place a number is manually adjusted. You receive a written assessment whether or not the engagement continues.",
    icon: AuditIcon,
  },
  {
    label: "Phase 02 · Weeks 3–8",
    title: "Build",
    body: "Warehouse, pipelines, and the modeling layer — delivered in two-week increments against the metrics leadership already asks for.",
    icon: BuildIcon,
  },
  {
    label: "Phase 03 · Ongoing",
    title: "Transfer",
    body: "Documentation, runbooks, and training for your team. The objective is a stack your people can operate without us — and a standing line when they would rather not.",
    icon: TransferIcon,
  },
];

export function Method() {
  return (
    <section id="method" className="border-y border-rule bg-surface-alt">
      <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)] py-[clamp(48px,6vw,84px)]">
        <Reveal className="mb-4 text-[12.5px] font-bold uppercase tracking-[0.11em] text-accent-deep">
          Engagement method
        </Reveal>
        <Reveal index={1}>
          <h2 className="mb-[clamp(32px,4vw,52px)] max-w-[22ch] font-serif text-[clamp(26px,3.4vw,42px)] font-normal leading-[1.12] tracking-[-0.02em] text-navy">
            Architecture before dashboards. Always.
          </h2>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(24px,3vw,40px)]">
          {PHASES.map((phase, i) => (
            <Reveal key={phase.title} index={i} className="border-t-2 border-navy pt-5">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-navy text-bg">
                <phase.icon />
              </div>
              <div className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-muted-2">
                {phase.label}
              </div>
              <h3 className="mb-2.5 mt-3 text-[21px] font-semibold text-navy">{phase.title}</h3>
              <p className="text-[14.5px] leading-[1.62] text-muted">{phase.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
