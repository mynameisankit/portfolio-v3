import { IllustrationText } from './IllustrationText';

const MARKET_ROWS = [76, 156, 236];
const MARKET_LABELS = ['US · $1,234.56', 'FR · 1 234,56 €', 'UK · £1,234.56'];

export function LocalizationIllustration() {
  return (
    <svg viewBox="0 0 600 330" aria-hidden="true" className="w-full text-primary" fill="none">
      <IllustrationText x="28" y="35" className="fill-current font-mono text-[12px]">
        SHARED LOCALIZATION / REGIONAL BEHAVIOR
      </IllustrationText>
      <rect
        x="28"
        y="109"
        width="195"
        height="112"
        rx="12"
        className="fill-card stroke-primary/40"
      />
      <IllustrationText x="48" y="140" maxWidth={161} className="fill-current text-[14px]">
        Shared formatting APIs
      </IllustrationText>
      <IllustrationText x="48" y="172" className="fill-muted-foreground text-[12px]">
        Currency · Date
      </IllustrationText>
      <IllustrationText x="48" y="194" className="fill-muted-foreground text-[12px]">
        Unit · Address
      </IllustrationText>
      <path
        d="M223 165h80V105h91m-91 60v20h91m-91-20v100h91"
        className="stroke-primary/20"
        strokeWidth="2"
      />
      <path
        d="M223 165h80V105h91m-91 60v20h91m-91-20v100h91"
        className="stroke-primary motion-safe:animate-[experience-flow_5s_linear_infinite]"
        strokeWidth="2"
        strokeDasharray="5 16"
      />
      {MARKET_ROWS.map((y, index) => (
        <g key={y} className="motion-safe:animate-[experience-confirm_5s_ease-in-out_infinite]">
          <rect x="394" y={y} width="178" height="58" rx="10" className="fill-card stroke-border" />
          <IllustrationText x="413" y={y + 35} className="fill-current font-mono text-[12px]">
            {MARKET_LABELS[index]}
          </IllustrationText>
        </g>
      ))}
      <IllustrationText x="28" y="300" className="fill-muted-foreground text-[12px]">
        Regional formats. Reused across product workflows.
      </IllustrationText>
    </svg>
  );
}
