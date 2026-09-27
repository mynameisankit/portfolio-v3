import { Text } from '@/app/_components/localization/Text';
import type { SkillCategory } from '@/data/skills/model';
import { SkillLink } from './SkillLink';

export function SkillGroup({ group, index }: { group: SkillCategory; index: number }) {
  return (
    <li className="min-w-0 border-t border-border pt-5">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-mono text-xs text-primary" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="text-lg font-medium">
          <Text>{group.title}</Text>
        </h3>
      </div>
      <ul className="flex list-none flex-wrap gap-2 p-0">
        {group.items.map((skill) => (
          <li key={skill.name}>
            <SkillLink skill={skill} />
          </li>
        ))}
      </ul>
    </li>
  );
}
