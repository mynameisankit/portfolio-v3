import type { Skill } from './model';

export const skillDefinitions: Skill[] = [
  { name: 'Claude Code', url: 'https://code.claude.com/docs/en/overview', icon: 'terminal' },
  { name: 'Bazel', url: 'https://bazel.build/', icon: 'hammer' },
  { name: 'Vite', url: 'https://vite.dev/', icon: 'zap' },
  { name: 'Rsbuild', url: 'https://rsbuild.rs/', icon: 'blocks' },
  {
    name: 'React',
    url: 'https://react.dev/',
    icon: 'atom',
  },
  {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org/docs/',
    icon: 'fileCode',
  },
  {
    name: 'JavaScript',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    icon: 'braces',
  },
  {
    name: 'HTML',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    icon: 'code',
  },
  {
    name: 'CSS',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    icon: 'palette',
  },
  {
    name: 'GraphQL',
    url: 'https://graphql.org/learn/',
    icon: 'network',
  },
  {
    name: 'Redux',
    url: 'https://redux.js.org/',
    icon: 'workflow',
  },
  {
    name: 'AI-assisted development',
    url: 'https://docs.github.com/en/copilot',
    icon: 'sparkles',
  },
  {
    name: 'Git',
    url: 'https://git-scm.com/doc',
    icon: 'gitBranch',
  },
];

export function resolveSkill(name: string): Skill {
  return skillDefinitions.find((skill) => skill.name === name) ?? { name, url: '', icon: 'code' };
}
