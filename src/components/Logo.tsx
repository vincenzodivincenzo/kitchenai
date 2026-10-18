export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="#111" aria-hidden="true">
      <rect x="7" y="6" width="2" height="28" rx="1" />
      <rect x="4" y="6" width="1.6" height="9" rx=".8" />
      <rect x="10.4" y="6" width="1.6" height="9" rx=".8" />
      <path d="M4 14h8v2a4 4 0 0 1-8 0z" />
      <ellipse cx="20" cy="12" rx="6" ry="7" />
      <rect x="19" y="18" width="2" height="16" rx="1" />
      <path d="M30 6c4 4 5 9 3 13h-3V6z" />
      <rect x="30" y="18" width="2" height="16" rx="1" />
    </svg>
  )
}
