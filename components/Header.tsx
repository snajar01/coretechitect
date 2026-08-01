import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#method", label: "Method" },
  { href: "#outcomes", label: "Outcomes" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-[rgba(251,250,249,0.92)] backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-[clamp(20px,4vw,48px)] py-4">
        <a href="#top" className="flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.01em] text-ink">
          <Logo />
          CoreTechitect
        </a>
        <nav className="flex items-center gap-4 text-[14.5px]">
          <div className="hidden items-center gap-[clamp(16px,2.4vw,32px)] min-[720px]:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted transition-colors duration-150 hover:text-accent-deep"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="inline-flex h-10 items-center rounded-md bg-navy px-5 text-[14.5px] font-semibold text-bg transition-colors duration-150 hover:bg-navy-hover"
          >
            Book a consultation
          </a>
        </nav>
      </div>
    </header>
  );
}
