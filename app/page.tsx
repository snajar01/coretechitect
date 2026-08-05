import { Capabilities } from "@/components/Capabilities";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MarqueeBand } from "@/components/MarqueeBand";
import { MetricStrip } from "@/components/MetricStrip";
import { Method } from "@/components/Method";
import { Outcomes } from "@/components/Outcomes";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <MetricStrip />
        <Capabilities />
        <MarqueeBand />
        <Method />
        <Outcomes />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
