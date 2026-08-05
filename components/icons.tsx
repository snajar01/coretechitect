// Hand-drawn line icons matching the Logo mark's geometric style. All use
// currentColor so they inherit their color from the parent's text class.

type IconProps = {
  size?: number;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function PlatformIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 3.5l8 4-8 4-8-4 8-4Z" />
      <path d="M4 11.5l8 4 8-4" />
      <path d="M4 15.5l8 4 8-4" />
    </svg>
  );
}

export function ScienceIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4 16.5l5-6 4 3 7-9" />
      <circle cx="4" cy="16.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="13" cy="13.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="20" cy="4.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ReliabilityIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 3.5l6.5 2.6v5.1c0 4.2-2.7 7.1-6.5 8.3-3.8-1.2-6.5-4.1-6.5-8.3V6.1L12 3.5Z" />
      <path d="M9 12.3l2.1 2.1 4-4.3" />
    </svg>
  );
}

export function AdvisoryIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.3 8.7l-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z" />
    </svg>
  );
}

export function AuditIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M19 19l-4.3-4.3" />
    </svg>
  );
}

export function BuildIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="3.5" y="3.5" width="8" height="8" rx="1" />
      <rect x="12.5" y="12.5" width="8" height="8" rx="1" />
      <path d="M11.5 8h2a2 2 0 0 1 2 2v2.5" />
    </svg>
  );
}

export function TransferIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4 6.5v11" />
      <path d="M4 12h13" />
      <path d="M13 7l4.5 5-4.5 5" />
    </svg>
  );
}
