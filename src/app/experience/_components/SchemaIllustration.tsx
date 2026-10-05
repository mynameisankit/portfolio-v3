import { IllustrationText } from './IllustrationText';

const VIEW_ROWS = [80, 211];
const VIEW_LABELS = ['Documentation', 'Request / response'];

export function SchemaIllustration() {
  return (
    <svg viewBox="0 0 600 330" aria-hidden="true" className="w-full text-primary" fill="none">
      <IllustrationText x="28" y="35" className="fill-current font-mono text-[12px]">
        SCHEMA-DRIVEN API EXPERIENCES
      </IllustrationText>
      <path
        d="M183 168h48m143 0h30V112h26m-26 56v77h26"
        className="stroke-primary/20"
        strokeWidth="2"
      />
      <path
        d="M183 168h48m143 0h30V112h26m-26 56v77h26"
        className="stroke-primary motion-safe:animate-[experience-flow_5s_linear_infinite]"
        strokeWidth="2"
        strokeDasharray="5 16"
      />
      <rect x="28" y="125" width="155" height="86" rx="12" className="fill-card stroke-border" />
      <IllustrationText x="49" y="160" maxWidth={120} className="fill-current text-[13px]">
        Backend schemas
      </IllustrationText>
      <IllustrationText x="49" y="185" className="fill-muted-foreground font-mono text-[12px]">
        {'{ fields }'}
      </IllustrationText>
      <rect
        x="231"
        y="116"
        width="143"
        height="105"
        rx="12"
        className="fill-card stroke-primary/40"
      />
      <IllustrationText x="250" y="148" maxWidth={110} className="fill-current text-[12px]">
        Server rendering
      </IllustrationText>
      <IllustrationText x="250" y="176" className="fill-muted-foreground text-[11px]">
        React Server
      </IllustrationText>
      <IllustrationText x="250" y="193" className="fill-muted-foreground text-[11px]">
        Components
      </IllustrationText>
      {VIEW_ROWS.map((y, index) => (
        <g key={y}>
          <rect x="430" y={y} width="144" height="65" rx="10" className="fill-card stroke-border" />
          <rect
            x="445"
            y={y + 12}
            width="90"
            height="5"
            rx="2"
            className="fill-primary/40 motion-safe:animate-[experience-confirm_5s_ease-in-out_infinite]"
          />
          <IllustrationText x="445" y={y + 43} maxWidth={115} className="fill-current text-[11px]">
            {VIEW_LABELS[index]}
          </IllustrationText>
        </g>
      ))}
      <IllustrationText x="28" y="300" className="fill-muted-foreground text-[12px]">
        Generated views. Less work on the client.
      </IllustrationText>
    </svg>
  );
}
