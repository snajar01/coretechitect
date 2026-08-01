import { CtaForm } from "./CtaForm";
import { Reveal } from "./Reveal";

export function CtaSection() {
  return (
    <section id="contact" className="bg-navy text-cta-fg">
      <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)] py-[clamp(52px,7vw,96px)]">
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-[clamp(28px,4vw,64px)]">
          <div>
            <h2 className="mb-4 max-w-[14ch] font-serif text-[clamp(30px,4.4vw,56px)] font-normal leading-[1.05] tracking-[-0.02em] text-white">
              Start with the audit.
            </h2>
            <p className="max-w-[48ch] text-base leading-[1.6] text-on-dark-body">
              A 45-minute conversation and a written assessment of your data estate. No obligation to build with
              us afterward.
            </p>
          </div>
          <CtaForm />
        </Reveal>
      </div>
    </section>
  );
}
