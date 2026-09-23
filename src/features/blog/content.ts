import type { Category, Post } from './model';

const titles: Record<Category, string[]> = {
  technical: [
    'Where frontend abstractions start to hurt',
    'Building a JSON renderer in React',
    'Making large tables feel fast',
    'TypeScript imports without relative paths',
    'A smaller API for reusable components',
    'Debugging a slow React render',
    'Moving from Moment to Temporal',
    'Designing useful loading states',
    'Keyboard navigation in complex interfaces',
    'Keeping state close to where it belongs',
    'A practical guide to browser observers',
    'What belongs in a custom hook?',
    'Rendering a thousand rows',
    'AI tools in my engineering workflow',
    'CSS layouts that survive real content',
  ],
  travelling: [
    'A weekend with no fixed route',
    'Packing lighter for a three-day ride',
    'The road is better before sunrise',
    'A short hike after a long week',
    'A rainy weekend in the hills',
    'What I carry on a motorcycle trip',
    'Taking the slower road home',
    'Walking through a city without a plan',
    'A campsite worth the detour',
    'Leaving room in the itinerary',
    'The photographs between destinations',
    'A quiet morning by the lake',
    'Planning a mountain ride',
    'Things I would pack differently',
    'When the weather changes the plan',
  ],
  'video-games': [
    'Games that leave room to get lost',
    'Returning to Hollow Knight',
    'The details in a good game menu',
    'Exploration without a checklist',
    'A weekend with Hades',
    'Learning through failure in games',
    'When the soundtrack tells the story',
    'Playing an old favourite again',
    'The appeal of a difficult boss fight',
    'A world that feels lived in',
    'Co-op games and shared mistakes',
    'A game I finally finished',
    'What makes movement feel good?',
    'Taking a break from competitive games',
    'The case for shorter games',
  ],
};
const descriptions: Record<Category, string> = {
  technical: 'Implementation notes, trade-offs, and the details that mattered.',
  travelling: 'Notes from the road, with a few stops along the way.',
  'video-games': 'A closer look at the systems and moments that stay with me.',
};
// Replace these samples with published content when the CMS is connected.
// An empty array intentionally renders the no-posts screen.
export const posts: Post[] = Array.from({ length: 15 }, (_, index) =>
  (Object.keys(titles) as Category[]).map((category, group) => ({
    slug: titles[category][index]
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-$/, ''),
    category,
    title: titles[category][index],
    description: descriptions[category],
    date: new Date(Date.UTC(2026, 8, 22 - index * 4 - group)).toISOString(),
    minutes: 4 + ((index + group) % 8),
    tags: [category, ...titles[category][index].split(' ')],
    body: [
      'This is a sample article used to preview the blog layout. It is not a published account of a project, trip, or game.',
      'The finished article will appear here, with space for detailed explanations, photos, screenshots, and code examples.',
    ],
    sample: true,
  })),
).flat();
