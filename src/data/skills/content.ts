import type { SkillCategory } from './model';
import { resolveSkill } from './skillDefinitions';

export const skills: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'].map(resolveSkill),
  },
  {
    id: 'platform',
    title: 'Platform & data',
    items: ['GraphQL', 'Redux', 'Bazel', 'Vite', 'Rsbuild'].map(resolveSkill),
  },
  {
    id: 'workflows',
    title: 'Engineering workflows',
    items: ['Claude Code', 'AI-assisted development', 'Git'].map(resolveSkill),
  },
];
