import { HeroGraphic } from "./HeroGraphic";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="hero-glow relative overflow-hidden">
      <div className="accent-shape accent-shape-1" />
      <div className="accent-shape accent-shape-2" />
      <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,48px)] pb-[clamp(40px,5vw,72px)] pt-[clamp(56px,8vw,104px)]">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,620px)_1fr]">
          <div className="grid max-w-[620px] gap-7">
            <Reveal
              index={0}
              className="flex items-center gap-2.5 text-[12.5px] font-semibold uppercase tracking-[0.11em] text-accent-deep"
            >
              <span className="block h-0.5 w-6 bg-accent" />
              Data architecture · Analytics · Applied AI
            </Reveal>
            <Reveal index={1}>
              <h1 className="max-w-[17ch] text-balance font-serif text-[clamp(38px,5.6vw,74px)] font-normal leading-[1.06] tracking-[-0.02em] text-navy">
                The data foundation the rest of the company stands on.
              </h1>
            </Reveal>
            <Reveal index={2}>
              <p className="max-w-[60ch] text-[clamp(16.5px,1.3vw,19px)] leading-[1.6] text-muted">
                CoreTechitect designs and builds modern data warehouses for organizations that have outgrown
                spreadsheets, dashboards no one trusts, and pipelines held together by one person&apos;s memory.
                Architecture first — then analytics and AI that hold up under scrutiny, not just in a demo.
              </p>
            </Reveal>
            <Reveal index={3} className="mt-1 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex h-[50px] items-center rounded-md bg-navy px-[26px] text-[15.5px] font-semibold text-bg transition-colors duration-150 hover:bg-navy-hover"
              >
                Book a consultation
              </a>
              <a
                href="#capabilities"
                className="inline-flex h-[50px] items-center rounded-md border border-rule-strong px-6 text-[15.5px] font-semibold text-ink transition-colors duration-150 hover:border-navy"
              >
                See what we build
              </a>
            </Reveal>
          </div>
          <div className="hidden justify-self-center lg:block lg:w-[380px] xl:justify-self-end">
            <HeroGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}
