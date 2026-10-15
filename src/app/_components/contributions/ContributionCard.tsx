import { Text } from '@/app/_components/localization/Text';
import type { Contribution } from '@/data/contributions/schema';
import { CircleDot, ExternalLink, GitPullRequest } from 'lucide-react';

export function ContributionCard({ entry }: { entry: Contribution }) {
  const Icon = entry.kind === 'pullRequest' ? GitPullRequest : CircleDot;
  const kindLabel = entry.kind === 'pullRequest' ? 'Pull request' : 'Issue report';

  return (
    <li className="min-w-0">
      <a
        href={entry.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-secondary/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-primary">
            <Icon size={14} aria-hidden="true" />
            <Text>{kindLabel}</Text>
          </span>
          <span className="font-mono text-muted-foreground">#{entry.number}</span>
        </div>
        <p className="mt-6 break-words font-mono text-xs text-muted-foreground">
          {entry.repository}
        </p>
        <h3 className="mt-2 text-xl font-medium leading-snug tracking-tight">
          <Text>{entry.title}</Text>
        </h3>
        <p className="mt-3 mb-6 text-sm leading-relaxed text-muted-foreground">
          <Text>{entry.summary}</Text>
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm text-primary">
          <Text>View on GitHub</Text>
          <ExternalLink size={14} aria-hidden="true" />
          <span className="sr-only">
            <Text>(opens in a new tab)</Text>
          </span>
        </span>
      </a>
    </li>
  );
}
