import Link from "next/link";
import type { ReactNode } from "react";

import { Logo } from "./Logo";

const linkClass = "text-[13.5px] text-muted transition-colors duration-150 hover:text-accent";

export function LegalPage({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b border-rule">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-[clamp(20px,4vw,48px)] py-4">
          <Link href="/" className="flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.01em] text-ink">
            <Logo />
            CoreTechitect
          </Link>
          <Link href="/" className={linkClass}>
            Back to home
          </Link>
        </div>
      </header>
      <main className="flex-1 py-[clamp(40px,6vw,72px)]">
        <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)]">
          <div className="max-w-[680px]">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.1em] text-accent">{eyebrow}</div>
            <h1 className="mb-3.5 font-serif text-[clamp(30px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.01em]">
              {title}
            </h1>
            {lede ? <p className="mb-7 text-[17px] text-muted">{lede}</p> : null}
            <div className="legal-body">{children}</div>
          </div>
        </div>
      </main>
      <footer className="border-t border-rule bg-surface-alt">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-7 gap-y-4 px-[clamp(20px,4vw,48px)] py-7 text-[13px] text-muted-3">
          <span>© 2026 CoreTechitect LLC</span>
          <div className="flex gap-5">
            <a href="/privacy" className={linkClass}>
              Privacy
            </a>
            <a href="/terms" className={linkClass}>
              Terms
            </a>
            <a href="/sms" className={linkClass}>
              Text alerts
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
