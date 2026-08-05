import { Logo } from "./Logo";

const PRACTICE_LINKS = ["Platform", "Data science & AI", "Reliability", "Advisory"];

const SITE_LINKS = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Method", href: "#method" },
  { label: "Outcomes", href: "#outcomes" },
  { label: "Contact", href: "#contact" },
];

const headingClass = "mb-3.5 text-xs font-bold uppercase tracking-[0.1em] text-muted-3";
const linkClass = "text-[13.5px] text-muted transition-colors duration-150 hover:text-accent-deep";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-surface-alt">
      <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)] pb-10 pt-[clamp(40px,5vw,64px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-8 gap-y-10 pb-10">
          <div className="max-w-[280px]">
            <a href="#top" className="flex items-center gap-2.5 text-[16px] font-semibold tracking-[-0.01em] text-ink">
              <Logo />
              CoreTechitect
            </a>
            <p className="mt-3.5 text-[13.5px] leading-[1.6] text-muted-2">
              Data architecture, analytics, and applied AI for organizations that need to trust their own numbers.
            </p>
          </div>
          <div>
            <div className={headingClass}>Practices</div>
            <ul className="grid gap-2.5">
              {PRACTICE_LINKS.map((label) => (
                <li key={label}>
                  <a href="#capabilities" className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className={headingClass}>Site</div>
            <ul className="grid gap-2.5">
              {SITE_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className={headingClass}>Start a conversation</div>
            <div className="grid gap-3.5">
              <a href="mailto:contact@coretechitect.com" className={linkClass}>
                contact@coretechitect.com
              </a>
              <a
                href="#contact"
                className="inline-flex h-9 w-fit items-center rounded-md bg-navy px-4 text-[13px] font-semibold text-bg transition-colors duration-150 hover:bg-navy-hover"
              >
                Book a consultation
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3.5 border-t border-rule-soft pt-6 text-[13px] text-muted-3">
          <span>© 2026 CoreTechitect LLC · Data architecture &amp; analytics</span>
          <a href="#top" className="transition-colors duration-150 hover:text-accent-deep">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
