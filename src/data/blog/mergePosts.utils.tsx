import type { Post } from './model';

export function mergePosts(posts: Post[]) {
  const paths = new Set<string>();
  for (const post of posts) {
    const path = `${post.category}/${post.slug}`;
    if (paths.has(path)) {
      throw new Error(`Duplicate blog URL: /blogs/${path}. Each article must have one owner.`);
    }
    paths.add(path);
  }

  return posts.toSorted((a, b) => Date.parse(b.date) - Date.parse(a.date));
}
