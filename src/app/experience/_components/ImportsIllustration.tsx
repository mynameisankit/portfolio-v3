import { IllustrationText } from './IllustrationText';

const TOOL_POSITIONS = [68, 123, 178, 233];
const TOOL_LABELS = ['Jest', 'Bazel', 'Code generators', 'Scaffolding'];

export function ImportsIllustration() {
  return (
    <svg viewBox="0 0 600 330" aria-hidden="true" className="w-full text-primary" fill="none">
      <IllustrationText x="28" y="35" className="fill-current font-mono text-[12px]">
        PACKAGE IMPORTS / TOOLCHAIN MIGRATION
      </IllustrationText>
      <rect x="28" y="105" width="185" height="116" rx="12" className="fill-card stroke-border" />
      <IllustrationText x="47" y="135" className="fill-muted-foreground font-mono text-[12px]">
        ../../../Component
      </IllustrationText>
      <path d="M49 155h140" className="stroke-border" />
      <IllustrationText x="47" y="183" className="fill-current font-mono text-[13px]">
        #/Component
      </IllustrationText>
      <IllustrationText x="47" y="203" maxWidth={152} className="fill-muted-foreground text-[10px]">
        Stable package-root reference
      </IllustrationText>
      <path
        d="M213 163h117V91h80m-80 72v-17h80m-80 17v38h80m-80-38v93h80"
        className="stroke-primary/20"
        strokeWidth="2"
      />
      <path
        d="M213 163h117V91h80m-80 72v-17h80m-80 17v38h80m-80-38v93h80"
        className="stroke-primary motion-safe:animate-[experience-flow_5s_linear_infinite]"
        strokeWidth="2"
        strokeDasharray="5 16"
      />
      <rect
        x="252"
        y="131"
        width="139"
        height="66"
        rx="10"
        className="fill-background stroke-primary/40"
      />
      <IllustrationText x="270" y="158" className="fill-current text-[13px]">
        package.json
      </IllustrationText>
      <IllustrationText x="270" y="179" className="fill-muted-foreground text-[11px]">
        imports
      </IllustrationText>
      {TOOL_POSITIONS.map((y, index) => (
        <g key={y}>
          <rect x="410" y={y} width="164" height="45" rx="8" className="fill-card stroke-border" />
          <circle
            cx="428"
            cy={y + 23}
            r="3"
            className="fill-primary motion-safe:animate-[experience-confirm_5s_ease-in-out_infinite]"
          />
          <IllustrationText x="442" y={y + 27} maxWidth={118} className="fill-current text-[12px]">
            {TOOL_LABELS[index]}
          </IllustrationText>
        </g>
      ))}
      <IllustrationText x="28" y="300" className="fill-muted-foreground text-[12px]">
        Staged rollout · Human and AI-assisted development
      </IllustrationText>
    </svg>
  );
}
