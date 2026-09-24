import './experience.css';

import { Text } from '@/features/localization/text';
import type { PortfolioContent } from '@/features/portfolio/content';

import { JourneyStop } from './journey-stop';

export function Experience({ content }: { content: PortfolioContent }) {
  return (
    <section id="experience" className="experience" aria-labelledby="experience-title">
      <div className="experience-heading">
        <span className="eyebrow">
          <Text>{'Experience & education'}</Text>
        </span>
        <h2 id="experience-title">
          <Text>{'The journey so far.'}</Text>
        </h2>
        <p className="experience-summary">
          <Text>{'From shared frontend libraries to owning cloud product interfaces.'}</Text>
        </p>
      </div>
      <ol className="journey-timeline" aria-label="Career journey, most recent first">
        {content.career.map((entry) => (
          <JourneyStop key={entry.id} entry={entry} />
        ))}
      </ol>
    </section>
  );
}
