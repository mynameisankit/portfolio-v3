import { Text } from '@/features/localization/text';

import type { CareerEntry } from './model';

export function JourneyStop({ entry }: { entry: CareerEntry }) {
  return (
    <li className="journey-stop" data-current={entry.current || undefined}>
      <span className="journey-marker" aria-hidden="true" />
      <div className="journey-period">
        <span>{<Text>{entry.period}</Text>}</span>
        {entry.current && (
          <span className="journey-current">
            <Text>{'Current'}</Text>
          </span>
        )}
      </div>
      <article className="journey-card" aria-labelledby={`career-${entry.id}`}>
        <header>
          <h3 id={`career-${entry.id}`}>{entry.organization}</h3>
          <p className="journey-role">{<Text>{entry.role}</Text>}</p>
          <p className="journey-location">{entry.location}</p>
        </header>
        <p className="journey-summary">{<Text>{entry.summary}</Text>}</p>
        {!!entry.highlights.length && (
          <details className="journey-details" open={entry.current}>
            <summary>
              <Text>{'Technical highlights'}</Text>
              <span className="journey-details-icon" aria-hidden="true">
                +
              </span>
            </summary>
            <ul>
              {entry.highlights.map((highlight) => (
                <li key={highlight}>{<Text>{highlight}</Text>}</li>
              ))}
            </ul>
          </details>
        )}
      </article>
    </li>
  );
}
