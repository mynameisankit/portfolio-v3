import { IllustrationText } from './IllustrationText';

const WORKFLOW_POSITIONS = [73, 205];

export function AuthenticationIllustration() {
  return (
    <svg viewBox="0 0 600 330" aria-hidden="true" className="w-full text-primary" fill="none">
      <IllustrationText x="28" y="35" className="fill-current font-mono text-[12px]">
        AUTHENTICATION / SHARED WORKFLOWS
      </IllustrationText>
      <path
        d="M175 163h57m149 0h25v-56h26m-26 56v76h26"
        className="stroke-primary/20"
        strokeWidth="2"
      />
      <path
        d="M175 163h57m149 0h25v-56h26m-26 56v76h26"
        className="stroke-primary motion-safe:animate-[experience-flow_5s_linear_infinite]"
        strokeWidth="2"
        strokeDasharray="5 16"
      />
      <rect x="28" y="124" width="147" height="78" rx="12" className="fill-card stroke-border" />
      <circle cx="55" cy="148" r="7" className="stroke-primary" />
      <path d="M42 173q13-21 26 0" className="stroke-primary" />
      <IllustrationText x="81" y="168" maxWidth={80} className="fill-current text-[13px]">
        Sign in
      </IllustrationText>
      <rect
        x="232"
        y="112"
        width="149"
        height="102"
        rx="12"
        className="fill-card stroke-primary/50"
      />
      <path d="M299 130h14v14h-14zm-4 5h24m-24 4h24" className="stroke-primary" />
      <IllustrationText x="250" y="170" maxWidth={117} className="fill-current text-[13px]">
        Shared OAuth
      </IllustrationText>
      <IllustrationText
        x="250"
        y="193"
        maxWidth={117}
        className="fill-muted-foreground text-[11px]"
      >
        Hooks + packages
      </IllustrationText>
      {WORKFLOW_POSITIONS.map((y, index) => (
        <g key={y}>
          <rect x="432" y={y} width="141" height="67" rx="10" className="fill-card stroke-border" />
          <circle
            cx="452"
            cy={y + 20}
            r="4"
            className="fill-primary motion-safe:animate-[experience-confirm_5s_ease-in-out_infinite]"
          />
          <IllustrationText x="450" y={y + 46} maxWidth={109} className="fill-current text-[12px]">
            {index === 0 ? 'Workflow 1' : 'Workflow 2'}
          </IllustrationText>
        </g>
      ))}
      <IllustrationText x="28" y="300" className="fill-muted-foreground text-[12px]">
        One implementation. Reused by multiple features.
      </IllustrationText>
    </svg>
  );
}
