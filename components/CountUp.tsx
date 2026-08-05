"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string;
}

function parseValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return match ? { target: parseInt(match[1], 10), suffix: match[2] } : null;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Counts up to the numeric lead of `value` (e.g. "14×" -> 0..14, keeping the
// "×" suffix static) once scrolled into view, or after a 2.5s fallback.
// Values with no leading number, or a target of 0, render as-is with no
// animation.
export function CountUp({ value }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const initial = parseValue(value);
  const [display, setDisplay] = useState(initial && initial.target > 0 ? "0" : value);

  useEffect(() => {
    const parsed = parseValue(value);
    if (!parsed || parsed.target === 0) return;
    const { target, suffix } = parsed;

    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let started = false;

    const animate = () => {
      if (started) return;
      started = true;
      if (reduceMotion) {
        raf = requestAnimationFrame(() => setDisplay(`${target}${suffix}`));
        return;
      }
      const duration = 1000;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setDisplay(`${Math.round(target * easeOut(t))}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      animate();
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.4 },
    );
    io.observe(node);
    // Mirrors Reveal's hard fallback: if the element never (or barely)
    // enters the viewport, still resolve to the real number.
    const fallback = window.setTimeout(animate, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{display}</span>;
}
