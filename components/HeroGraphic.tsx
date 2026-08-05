import type { CSSProperties } from "react";

// Scattered sources converge into the governed platform stack, which feeds
// two trustworthy outputs — a visual echo of the hero copy. Pure CSS
// animation (see .hg-* in globals.css), no client JS needed.

const HUB_IN = { x: 195, y: 160 };
const HUB_OUT = { x: 265, y: 160 };

const SOURCES = [
  { x: 50, y: 70, r: 6, delay: 0 },
  { x: 30, y: 140, r: 5, delay: 90 },
  { x: 58, y: 208, r: 7, delay: 180 },
  { x: 96, y: 250, r: 5, delay: 270 },
  { x: 90, y: 102, r: 5, delay: 360 },
];

const LAYERS = [
  { y: 170, delay: 520 },
  { y: 152, delay: 600 },
  { y: 134, delay: 680 },
];

const OUTPUTS = [
  { x: 362, y: 108, delay: 900 },
  { x: 332, y: 222, delay: 980 },
];

function delayStyle(ms: number): CSSProperties {
  return { "--hg-delay": `${ms}ms` } as CSSProperties;
}

export function HeroGraphic() {
  return (
    <svg viewBox="0 0 460 320" fill="none" aria-hidden="true" className="h-auto w-full">
      {SOURCES.map((s, i) => (
        <path
          key={`sl-${i}`}
          d={`M ${s.x} ${s.y} Q ${HUB_IN.x} ${s.y} ${HUB_IN.x} ${HUB_IN.y}`}
          className="hg-line stroke-navy-line"
          strokeWidth={1.5}
          style={delayStyle(s.delay)}
        />
      ))}

      {OUTPUTS.map((o, i) => (
        <path
          key={`ol-${i}`}
          d={`M ${HUB_OUT.x} ${HUB_OUT.y} Q ${o.x} ${HUB_OUT.y} ${o.x} ${o.y}`}
          className="hg-line stroke-accent"
          strokeWidth={1.75}
          style={delayStyle(o.delay)}
        />
      ))}

      {LAYERS.map((l, i) => (
        <rect
          key={`layer-${i}`}
          x={195}
          y={l.y}
          width={70}
          height={16}
          rx={4}
          className="hg-node fill-navy"
          style={delayStyle(l.delay)}
        />
      ))}

      {SOURCES.map((s, i) => (
        <circle
          key={`sn-${i}`}
          cx={s.x}
          cy={s.y}
          r={s.r}
          className="hg-node fill-surface stroke-rule-strong"
          strokeWidth={1.5}
          style={delayStyle(s.delay + 650)}
        />
      ))}

      <g className="hg-pulse" style={delayStyle(OUTPUTS[0].delay + 750)}>
        <circle cx={OUTPUTS[0].x} cy={OUTPUTS[0].y} r={17} className="fill-surface stroke-accent-deep" strokeWidth={1.5} />
        <rect x={OUTPUTS[0].x - 8} y={OUTPUTS[0].y + 2} width={4} height={7} rx={1} className="fill-accent-deep" />
        <rect x={OUTPUTS[0].x - 2} y={OUTPUTS[0].y - 3} width={4} height={12} rx={1} className="fill-accent-deep" />
        <rect x={OUTPUTS[0].x + 4} y={OUTPUTS[0].y - 8} width={4} height={17} rx={1} className="fill-accent-deep" />
      </g>

      <g className="hg-pulse" style={delayStyle(OUTPUTS[1].delay + 750)}>
        <circle cx={OUTPUTS[1].x} cy={OUTPUTS[1].y} r={17} className="fill-surface stroke-navy" strokeWidth={1.5} />
        <path
          d={`M ${OUTPUTS[1].x - 7} ${OUTPUTS[1].y} l 5 5 l 9 -10`}
          className="stroke-navy"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
