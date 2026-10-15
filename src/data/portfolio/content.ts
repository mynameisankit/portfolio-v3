import { contributions } from '@/data/contributions/content';
import { career } from '@/data/experience/content';
import { skills } from '@/data/skills/content';

export const portfolio = {
  name: 'Ankit Kumar',
  role: 'Software Engineer',
  company: 'Rubrik',
  headline: 'I build web interfaces.',
  subtitle: 'Web interfaces, frontend infrastructure, and a few things outside work.',
  github: 'https://github.com/mynameisankit',
  resumeUrl: '',
  projects: [
    {
      id: 'json',
      name: 'React JSON Renderer',
      category: 'React component + hook',
      description:
        'Display JSON as an expandable tree. Use the renderer component or build a custom view with useJsonLines.',
      source: 'https://github.com/mynameisankit/react-json-renderer',
    },
    {
      id: 'life',
      name: 'Conway’s Game of Life',
      category: 'Interactive simulation',
      description:
        'A cellular automaton built around a small set of rules. This is a preview; the standalone project rewrite is planned.',
      source: '',
    },
  ],
  additionalProjects: [] as {
    title: string;
    description: string;
    image: string;
    lqip: string;
    source: string;
  }[],
  career,
  contributions,
  skills,
  hobbies: [
    { name: 'Hiking', image: '', lqip: '', caption: 'Photo placeholder' },
    { name: 'Motorcycling', image: '', lqip: '', caption: 'Photo placeholder' },
    { name: 'Running', image: '', lqip: '', caption: 'Photo placeholder' },
    { name: 'Video games', image: '', lqip: '', caption: 'Photo placeholder' },
  ].map((hobby) => ({ ...hobby, location: '', takenOn: '', story: '' })),
};
export type PortfolioContent = typeof portfolio;
