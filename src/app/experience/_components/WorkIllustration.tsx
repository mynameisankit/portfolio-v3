import { Text } from '@/app/_components/localization/Text';
import type { EngineeringWork } from '@/data/experience/engineeringContent';
import { IllustrationMedia } from './IllustrationMedia';

export function WorkIllustration({ work }: { work: EngineeringWork }) {
  if (work.illustration === 'none' && !work.illustrationUrl) {
    return null;
  }

  return (
    <figure className="rounded-xl border border-border bg-secondary/20 p-3 sm:p-5">
      <div>
        <IllustrationMedia work={work} />
      </div>
      <figcaption className="border-t border-border px-2 pt-4 text-sm leading-relaxed text-muted-foreground">
        <Text>{work.caption}</Text>
      </figcaption>
    </figure>
  );
}
