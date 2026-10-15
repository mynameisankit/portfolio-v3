import { Text } from '@/app/_components/localization/Text';
import type { Contribution } from '@/data/contributions/schema';
import { ContributionCard } from './ContributionCard';

export function Contributions({ entries }: { entries: Contribution[] }) {
  if (!entries.length) {
    return null;
  }

  return (
    <section
      id="contributions"
      aria-labelledby="contributions-title"
      className="mx-[5%] border-t border-border py-14"
    >
      <div className="mb-9 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <Text>Open source</Text>
        </p>
        <h2
          id="contributions-title"
          className="mt-4 text-[clamp(32px,4vw,46px)] font-medium leading-tight tracking-tight"
        >
          <Text>Contributing to the tools I use.</Text>
        </h2>
        <p className="mt-4 text-muted-foreground">
          <Text>Bug reports, reproductions, and contributions to the open source community.</Text>
        </p>
      </div>
      <ul className="grid list-none gap-4 p-0 md:grid-cols-2">
        {entries.map((entry) => (
          <ContributionCard key={entry.id} entry={entry} />
        ))}
      </ul>
    </section>
  );
}
