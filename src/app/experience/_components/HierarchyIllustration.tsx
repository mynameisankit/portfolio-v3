import { IllustrationText } from './IllustrationText';

const TABLE_ROW_POSITIONS = [132, 179, 226];

export function HierarchyIllustration() {
  return (
    <svg viewBox="0 0 600 330" aria-hidden="true" className="w-full text-primary" fill="none">
      <IllustrationText x="28" y="35" className="fill-current font-mono text-[12px]">
        HIERARCHY / CROSS-PAGE SELECTION
      </IllustrationText>
      <rect x="28" y="65" width="170" height="207" rx="12" className="fill-card stroke-border" />
      <path d="M49 119v107m0-63h18m-18 63h18" className="stroke-primary/40" />
      <IllustrationText x="45" y="99" className="fill-current text-[13px]">
        Organization
      </IllustrationText>
      <rect
        x="65"
        y="141"
        width="117"
        height="38"
        rx="6"
        className="fill-primary/10 stroke-primary/40"
      />
      <IllustrationText x="78" y="165" className="fill-current text-[12px]">
        Group A
      </IllustrationText>
      <IllustrationText x="78" y="229" className="fill-muted-foreground text-[12px]">
        Group B
      </IllustrationText>
      <path d="M199 161h29" className="stroke-primary/40" strokeDasharray="4 5" />
      <rect x="234" y="65" width="338" height="207" rx="12" className="fill-card stroke-border" />
      <path d="M234 108h338" className="stroke-border" />
      <rect x="252" y="81" width="15" height="15" rx="3" className="fill-primary" />
      <path d="m255 88 3 3 6-7" className="stroke-primary-foreground" strokeWidth="2" />
      <IllustrationText x="280" y="94" className="fill-current text-[12px]">
        Select across all pages
      </IllustrationText>
      {TABLE_ROW_POSITIONS.map((y) => (
        <g key={y}>
          <rect
            x="253"
            y={y}
            width="14"
            height="14"
            rx="3"
            className="fill-primary/20 stroke-primary"
          />
          <path d={`m256 ${y + 6} 3 3 5-6`} className="stroke-primary" strokeWidth="2" />
          <rect
            x="280"
            y={y + 2}
            width="120"
            height="10"
            rx="5"
            className="fill-muted-foreground/20"
          />
          <circle cx="546" cy={y + 7} r="4" className="fill-primary/60" />
        </g>
      ))}
      <g className="motion-safe:animate-[experience-page-first_8s_ease-in-out_infinite]">
        <IllustrationText x="419" y="143" className="fill-muted-foreground font-mono text-[11px]">
          account / a
        </IllustrationText>
        <IllustrationText x="419" y="190" className="fill-muted-foreground font-mono text-[11px]">
          account / b
        </IllustrationText>
        <IllustrationText x="419" y="237" className="fill-muted-foreground font-mono text-[11px]">
          account / c
        </IllustrationText>
        <IllustrationText x="482" y="302" className="fill-current font-mono text-[12px]">
          PAGE 01 →
        </IllustrationText>
      </g>
      <g className="opacity-0 motion-safe:animate-[experience-page-second_8s_ease-in-out_infinite]">
        <IllustrationText x="419" y="143" className="fill-muted-foreground font-mono text-[11px]">
          account / d
        </IllustrationText>
        <IllustrationText x="419" y="190" className="fill-muted-foreground font-mono text-[11px]">
          account / e
        </IllustrationText>
        <IllustrationText x="419" y="237" className="fill-muted-foreground font-mono text-[11px]">
          account / f
        </IllustrationText>
        <IllustrationText x="482" y="302" className="fill-current font-mono text-[12px]">
          PAGE 02 →
        </IllustrationText>
      </g>
      <circle cx="244" cy="298" r="4" className="fill-current" />
      <IllustrationText x="257" y="302" className="fill-current text-[12px]">
        Selection retained
      </IllustrationText>
    </svg>
  );
}
