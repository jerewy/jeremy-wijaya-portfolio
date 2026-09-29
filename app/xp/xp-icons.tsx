// Hand-drawn XP-style icons. Deliberately not Microsoft's artwork.

type IconProps = { size?: number };

export function FolderIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M2 8h10l3 3h15v16H2z" fill="#e8b93c" stroke="#a87b12" />
      <path d="M2 13h28v14H2z" fill="#f9d46b" stroke="#a87b12" />
    </svg>
  );
}

export function ComputerIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect x="4" y="4" width="24" height="17" rx="2" fill="#d9dde4" stroke="#5a6475" />
      <rect x="7" y="7" width="18" height="11" fill="#3a78d8" />
      <path d="M7 18l6-6 4 4 3-3 5 5z" fill="#6fbf4a" />
      <rect x="10" y="23" width="12" height="3" fill="#b8bec8" stroke="#5a6475" />
      <rect x="6" y="26" width="20" height="3" rx="1" fill="#d9dde4" stroke="#5a6475" />
    </svg>
  );
}

export function DocumentIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M7 3h13l6 6v20H7z" fill="#fff" stroke="#5a6475" />
      <path d="M20 3v6h6" fill="#dfe6f2" stroke="#5a6475" />
      <path d="M10 13h12M10 17h12M10 21h9" stroke="#2f5fb3" strokeWidth="1.5" />
    </svg>
  );
}

export function MailIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect x="3" y="7" width="26" height="18" rx="1" fill="#fdfdfd" stroke="#5a6475" />
      <path d="M3 8l13 10L29 8" fill="none" stroke="#2f5fb3" strokeWidth="1.5" />
    </svg>
  );
}

export function ExeIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect x="3" y="5" width="26" height="22" rx="2" fill="#eef2f8" stroke="#5a6475" />
      <rect x="3" y="5" width="26" height="5" rx="2" fill="#2f6fd6" />
      <path d="M9 15l4 3-4 3M15 22h8" stroke="#1d3f7a" strokeWidth="1.8" fill="none" />
    </svg>
  );
}

export function StartOrb({ size = 18 }: IconProps) {
  // A personal "J" monogram instead of the Windows flag (trademarked).
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden>
      <circle cx="9" cy="9" r="8" fill="#fff" stroke="#1f6b1f" />
      <path d="M11 4.5v6a2.5 2.5 0 0 1-5 0" fill="none" stroke="#2c8a2c" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
