import Fuse from 'fuse.js';

import type { Post } from './model';

export function createPostSearch(posts: Post[]) {
  return new Fuse(posts, {
    threshold: 0.32,
    ignoreLocation: true,
    minMatchCharLength: 2,
    keys: [
      { name: 'title', weight: 5 },
      { name: 'tags', weight: 3 },
      { name: 'description', weight: 2 },
      { name: 'body', weight: 1 },
    ],
  });
}
