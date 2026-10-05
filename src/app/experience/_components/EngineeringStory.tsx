import { Text } from '@/app/_components/localization/Text';
import type { EngineeringWork } from '@/data/experience/engineeringContent';
import { WorkIllustration } from './WorkIllustration';

export function EngineeringStory({ work }: { work: EngineeringWork }) {
  return (
    <article
      id={work.id}
      className="grid items-start gap-7 border-t border-border py-12 min-[2560px]:grid-cols-2 min-[2560px]:gap-10"
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-primary">
          <Text>{work.category}</Text>
        </p>
        <h3 className="mt-4 text-[clamp(28px,3vw,42px)] font-medium leading-tight tracking-tight">
          <Text>{work.title[0]}</Text>
          <br />
          <Text>{work.title[1]}</Text>
        </h3>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground min-[2560px]:text-lg">
          {work.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              <Text>{paragraph}</Text>
            </p>
          ))}
        </div>
      </div>
      <WorkIllustration work={work} />
    </article>
  );
}
