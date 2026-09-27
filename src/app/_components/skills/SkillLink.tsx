import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import type { Skill } from '@/data/skills/model';
import { skillIcons } from './skillIcons';
import { ArrowUpRight } from 'lucide-react';

export function SkillLink({ skill }: { skill: Skill }) {
  const Icon = skillIcons[skill.icon] ?? skillIcons.code;
  const label = (
    <>
      <Icon aria-hidden="true" className="size-4 shrink-0 text-primary" />
      <Text>{skill.name}</Text>
    </>
  );
  const className =
    'inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground';
  if (!skill.url) {
    return <span className={className}>{label}</span>;
  }

  return (
    <Link
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${
        className
      } transition-colors hover:border-primary hover:bg-secondary focus-visible:border-primary motion-reduce:transition-none`}
      preview={{ title: skill.name, description: 'Documentation & reference' }}
    >
      {label}
      <ArrowUpRight aria-hidden="true" className="size-3 shrink-0 text-muted-foreground" />
    </Link>
  );
}
