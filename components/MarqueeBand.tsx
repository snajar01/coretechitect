// Decorative, infinitely-scrolling restatement of terms already covered in
// Capabilities — purely visual texture, so the whole thing is aria-hidden.
const TERMS = [
  "Governance",
  "Lineage",
  "Forecasting",
  "Reconciliation",
  "Monitoring",
  "Advisory",
  "Modeling",
  "Alerting",
];

function TermGroup() {
  return (
    <span className="flex shrink-0 items-center">
      {TERMS.map((term) => (
        <span key={term} className="flex items-center">
          <span className="px-6 font-serif text-[24px] text-navy sm:px-8 sm:text-[30px]">{term}</span>
          <span className="text-accent">•</span>
        </span>
      ))}
    </span>
  );
}

export function MarqueeBand() {
  return (
    <div className="overflow-hidden border-y border-rule bg-surface-alt py-6 sm:py-7">
      <div className="marquee-track" aria-hidden="true">
        <TermGroup />
        <TermGroup />
      </div>
    </div>
  );
}
