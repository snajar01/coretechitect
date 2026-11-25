import Image from "next/image";

// Brand assets live in public/brand (from the Core Techitect brand kit, on a
// transparent background for the dark theme):
//   - "wordmark": symbol + stencil wordmark, vertically centred (header)
//   - "emblem":   large C with the name inside it (hero, footer). Only use it
//                 at 160px or more; the lettering is unreadable below that.
const VARIANTS = {
  wordmark: { src: "/brand/logo-wordmark.svg", ratio: 928 / 188 },
  emblem: { src: "/brand/logo-emblem.svg", ratio: 1 },
} as const;

export function Logo({ variant = "wordmark", height = 40 }: { variant?: keyof typeof VARIANTS; height?: number }) {
  const { src, ratio } = VARIANTS[variant];
  return (
    <Image
      src={src}
      alt="Core Techitect"
      width={Math.round(height * ratio)}
      height={height}
      priority={variant === "wordmark"}
      className="block w-auto"
      style={{ height }}
    />
  );
}
