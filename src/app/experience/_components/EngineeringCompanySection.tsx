import { Text } from '@/app/_components/localization/Text';
import type { EngineeringWork } from '@/data/experience/engineeringContent';
import { EngineeringStory } from './EngineeringStory';

export function EngineeringCompanySection({
  heading,
  id,
  works,
}: {
  heading: string;
  id: string;
  works: readonly EngineeringWork[];
}) {
  if (!works.length) {
    return null;
  }

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-8 pb-10">
      <h2
        id={`${id}-title`}
        className="pb-6 text-[clamp(32px,3.5vw,56px)] font-medium leading-tight tracking-tight text-foreground"
      >
        <Text>{heading}</Text>
      </h2>
      {works.map((work) => (
        <EngineeringStory key={work.id} work={work} />
      ))}
    </section>
  );
}
