import type { Contribution } from './schema';

export const contributions: Contribution[] = [
  {
    id: 'nextjs-63121',
    kind: 'issue',
    repository: 'vercel/next.js',
    number: 63121,
    title: 'React hooks crash in the App Router',
    summary:
      'Reported a React hooks rendering error during App Router navigation, with a reproducible example and steps tested across Next.js versions.',
    url: 'https://github.com/vercel/next.js/issues/63121',
  },
  {
    id: 'mui-35527',
    kind: 'issue',
    repository: 'mui/material-ui',
    number: 35527,
    title: 'Search UI glitch in the MUI docs',
    summary:
      'Reported an unstyled circle and unexpected page scrolling when searching the MUI documentation on a slow connection, with screenshots of the behavior.',
    url: 'https://github.com/mui/material-ui/issues/35527',
  },
];
