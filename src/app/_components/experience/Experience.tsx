import { Text } from '@/app/_components/localization/Text';
import type { PortfolioContent } from '@/data/portfolio/content';
import { JourneyStop } from './JourneyStop';

export function Experience({ content }: { content: PortfolioContent }) {
  return (
    <section
      id="experience"
      className="experience mt-7 mx-[5%] mb-0 pt-14 px-0 pb-16 grid grid-cols-[minmax(0,_0.85fr)_minmax(0,_1.8fr)] items-start gap-11 [border-top:1px_solid_var(--border)] max-[761px]:grid-cols-1 max-[761px]:gap-8"
      aria-labelledby="experience-title"
    >
      <div className="experience-heading sticky top-8 max-[761px]:[position:static] [html[lang='ja']_&_h2]:tracking-[0]">
        <span className="eyebrow font-mono text-[12px] leading-[1.6] tracking-[1.2px] uppercase text-muted-foreground min-[2560px]:text-[14px]">
          <Text>Experience &amp; education</Text>
        </span>
        <h2
          className="text-[clamp(38px,_4.8vw,_58px)] leading-[1.08] font-medium tracking-[-2px] my-5 mx-0 min-[2560px]:text-[64px]"
          id="experience-title"
        >
          <Text>The journey so far.</Text>
        </h2>
        <p className="experience-summary max-w-65 text-muted-foreground max-[761px]:max-w-full">
          <Text>From shared frontend libraries to owning cloud product interfaces.</Text>
        </p>
      </div>
      <ol
        className="journey-timeline list-none m-0 [padding:0_0_0_10px]"
        aria-label="Career journey, most recent first"
      >
        {content.career.map((entry) => (
          <JourneyStop key={entry.id} entry={entry} />
        ))}
      </ol>
    </section>
  );
}
