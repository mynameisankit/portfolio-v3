export const portfolio = {
  name: 'Ankit Kumar',
  role: 'Software Engineer',
  company: 'Rubrik',
  headline: 'I build web interfaces.',
  subtitle: 'Web interfaces, frontend infrastructure, and a few things outside work.',
  github: 'https://github.com/mynameisankit',
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
  experience: [
    {
      title: 'Cloud Workloads',
      description:
        'Own frontend architecture and delivery for Cloud Workloads, from implementation through ongoing optimization.',
      bullets: [],
    },
    {
      title: 'Frontend infrastructure',
      description: '',
      bullets: [
        'Modernized module imports with TypeScript subpath imports.',
        'Built a reusable paginated hierarchy table component.',
        'Migrated from Moment.js to the Temporal API.',
        'Replaced more than six legacy dependencies.',
      ],
    },
    {
      title: 'Engineering workflows',
      description:
        'Integrate AI agents into day-to-day software engineering workflows and evaluate new tools for the team.',
      bullets: [],
    },
  ],
  hobbies: [
    { name: 'Hiking', image: '', caption: 'Photo placeholder' },
    { name: 'Motorcycling', image: '', caption: 'Photo placeholder' },
    { name: 'Running', image: '', caption: 'Photo placeholder' },
    { name: 'Video games', image: '', caption: 'Photo placeholder' },
  ],
};
export type PortfolioContent = typeof portfolio;
