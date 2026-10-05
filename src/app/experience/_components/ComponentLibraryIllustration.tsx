import { IllustrationText } from './IllustrationText';

const USAGE_POSITIONS = [76, 160, 244];

export function ComponentLibraryIllustration() {
  return (
    <svg viewBox="0 0 600 330" aria-hidden="true" className="w-full text-primary" fill="none">
      <IllustrationText x="28" y="35" className="fill-current font-mono text-[12px]">
        CONTRACT / MIGRATION / CHECKS
      </IllustrationText>
      <rect
        x="28"
        y="113"
        width="169"
        height="106"
        rx="12"
        className="fill-card stroke-primary/50"
      />
      <path d="m68 148-10 10 10 10m18-20 10 10-10 10" className="stroke-primary" strokeWidth="2" />
      <IllustrationText x="48" y="192" maxWidth={135} className="fill-current text-[13px]">
        Clear component API
      </IllustrationText>
      <path
        d="M197 166h60m0 0v-75h151m-151 75h151m-151 0v84h151"
        className="stroke-primary/20"
        strokeWidth="2"
      />
      <path
        d="M197 166h60m0 0v-75h151m-151 75h151m-151 0v84h151"
        className="stroke-primary motion-safe:animate-[experience-flow_5s_linear_infinite]"
        strokeWidth="2"
        strokeDasharray="5 16"
      />
      <rect
        x="230"
        y="131"
        width="153"
        height="69"
        rx="10"
        className="fill-background stroke-border"
      />
      <IllustrationText x="250" y="157" maxWidth={119} className="fill-current text-[12px]">
        Automated migration
      </IllustrationText>
      <IllustrationText
        x="250"
        y="179"
        maxWidth={119}
        className="fill-muted-foreground font-mono text-[10px]"
      >
        CODEMODS + AI SKILLS
      </IllustrationText>
      {USAGE_POSITIONS.map((y) => (
        <g key={y} className="motion-safe:animate-[experience-confirm_5s_ease-in-out_infinite]">
          <rect
            x="409"
            y={y}
            width="164"
            height="50"
            rx="9"
            className="fill-card stroke-primary/35"
          />
          <path d={`m428 ${y + 25} 5 5 10-11`} className="stroke-primary" strokeWidth="2" />
          <IllustrationText x="455" y={y + 29} maxWidth={104} className="fill-current text-[12px]">
            Usage updated
          </IllustrationText>
        </g>
      ))}
      <IllustrationText x="28" y="300" className="fill-muted-foreground text-[12px]">
        Type-safe contracts. Lint-enforced conventions.
      </IllustrationText>
    </svg>
  );
}
