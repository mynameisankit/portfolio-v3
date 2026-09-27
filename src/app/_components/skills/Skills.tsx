import { Text } from '@/app/_components/localization/Text';
import type { SkillCategory } from '@/data/skills/model';
import { SkillGroup } from './SkillGroup';

export function Skills({ groups }: { groups: SkillCategory[] }) {
  if (!groups.length) {
    return null;
  }

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="mx-[5%] border-t border-border py-14"
    >
      <div className="mb-9 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <Text>Tools & practices</Text>
        </p>
        <h2
          id="skills-title"
          className="mt-4 text-[clamp(32px,4vw,46px)] font-medium leading-tight tracking-tight"
        >
          <Text>Skills</Text>
        </h2>
        <p className="mt-4 text-muted-foreground">
          <Text>The tools and practices behind my work.</Text>
        </p>
      </div>
      <ul className="grid list-none gap-8 p-0 md:grid-cols-3">
        {groups.map((group, index) => (
          <SkillGroup key={group.id} group={group} index={index} />
        ))}
      </ul>
    </section>
  );
}
