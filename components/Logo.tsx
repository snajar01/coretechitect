// The brand mark: two "rising columns" inside a rounded navy square.
// Colors are hardcoded (not CSS vars) so this also doubles as the source
// for the static app/icon.svg favicon.
export function Logo({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="20" height="20" rx="4" fill="#14293F" />
      <rect x="4" y="10" width="4" height="6" fill="#FBFAF9" />
      <rect x="11" y="4" width="4" height="12" fill="#C0692F" />
    </svg>
  );
}
