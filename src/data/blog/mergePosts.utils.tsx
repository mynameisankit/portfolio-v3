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

  return posts.toSorted(
    (a, b) => (b.date ? Date.parse(b.date) : 0) - (a.date ? Date.parse(a.date) : 0),
  );
}
