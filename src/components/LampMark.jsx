export default function LampMark({ size = 26, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 3c-1.2 1-1 2.4.2 3M12 3c1.2 1 1 2.4-.2 3"
        stroke="var(--purple-700)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="12" cy="14" r="6" fill="var(--purple-700)" />
      <circle cx="12" cy="14" r="2.4" fill="var(--gold-200)" />
    </svg>
  );
}
