import type { Post } from './model';
import Fuse from 'fuse.js';

function queryVariants(query: string) {
  const characters = Array.from(query.trim().slice(0, 100));

  return [
    ...new Set([
      query,
      ...characters
        .slice(0, -1)
        .map((_, index) =>
          [
            ...characters.slice(0, index),
            characters[index + 1],
            characters[index],
            ...characters.slice(index + 2),
          ].join(''),
        ),
    ]),
  ];
}

export function createPostSearch(posts: Post[]) {
  const index = new Fuse(posts, {
    threshold: 0.32,
    ignoreLocation: true,
    minMatchCharLength: 2,
    includeScore: true,
    keys: [
      { name: 'title', weight: 5 },
      { name: 'tags', weight: 3 },
      { name: 'description', weight: 2 },
      { name: 'body', weight: 1 },
    ],
  });

  return {
    search(query: string) {
      // Fuse handles approximate matches; adjacent swaps additionally cover common transposition typos.
      const matches = queryVariants(query).flatMap((variant) => index.search(variant));
      const best = matches.reduce((results, match) => {
        const key = `${match.item.category}/${match.item.slug}`;
        const previous = results.get(key);
        if (!previous || (match.score ?? 1) < (previous.score ?? 1)) {
          results.set(key, match);
        }

        return results;
      }, new Map<string, (typeof matches)[number]>());

      return [...best.values()].sort((a, b) => (a.score ?? 1) - (b.score ?? 1));
    },
  };
}
