import './brand.css';

export function Brand() {
  return (
    <span className="brand">
      <svg className="brand-symbol" viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="7" fill="var(--primary)" />
        <text
          x="20"
          y="28"
          textAnchor="middle"
          fill="var(--primary-foreground)"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="900"
          fontSize="25"
          letterSpacing="-1.5"
        >
          fyi
        </text>
      </svg>
      <span className="brand-name">
        ankitkumar<span className="brand-tld">.fyi</span>
      </span>
    </span>
  );
}
