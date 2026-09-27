export function Brand() {
  return (
    <span className="brand inline-flex items-center gap-[10px] whitespace-nowrap">
      <svg
        className="brand-symbol w-9 h-9 shrink-0 text-primary"
        viewBox="0 0 40 40"
        aria-hidden="true"
      >
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
      <span className="brand-name text-[21px] font-semibold tracking-[-0.9px] text-foreground">
        ankitkumar<span className="brand-tld text-primary">.fyi</span>
      </span>
    </span>
  );
}
