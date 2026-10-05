import { Text } from '@/app/_components/localization/Text';
import { ConditionalRenderer } from '@/app/_components/ui/ConditionalRenderer';
import type { CareerEntry } from '@/data/experience/model';
import { cn } from '@/lib/className.utils';

export function CareerNavigationItem({
  entry,
  isActive,
  sectionId,
}: {
  entry: CareerEntry;
  isActive: boolean;
  sectionId?: string;
}) {
  const details = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          'absolute -left-[6px] top-4 size-[11px] rounded-full border-2 border-muted-foreground bg-background transition-colors motion-reduce:transition-none',
          isActive &&
            'border-primary bg-primary shadow-[0_0_0_4px_color-mix(in_srgb,var(--primary)_15%,transparent)]',
          entry.current &&
            'border-primary bg-primary shadow-[0_0_0_5px_color-mix(in_srgb,var(--primary)_18%,transparent)] motion-safe:animate-[journey-current-glow_2s_ease-in-out_infinite]',
        )}
      />
      <span className="flex flex-wrap items-center gap-2">
        <span className="text-lg font-medium">
          <Text>{entry.organization}</Text>
        </span>
        <ConditionalRenderer shouldRender={entry.current}>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
            <Text>Current</Text>
          </span>
        </ConditionalRenderer>
      </span>
      <span className="mt-2 block text-sm leading-relaxed">
        <Text>{entry.role}</Text>
      </span>
      <span className="mt-1 block text-xs text-muted-foreground">
        <Text>{entry.location}</Text>
      </span>
    </>
  );
  const className = cn(
    'block rounded-xl px-3 py-2 text-muted-foreground transition-colors motion-reduce:transition-none',
    isActive && 'bg-primary/10 text-foreground',
  );

  if (sectionId) {
    return (
      <a
        href={`#${sectionId}`}
        aria-current={isActive ? 'location' : undefined}
        className={cn(className, 'hover:bg-button-hover hover:text-foreground')}
      >
        {details}
      </a>
    );
  }

  return <div className={className}>{details}</div>;
}
