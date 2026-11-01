import { cache } from 'react';
import { getMdxPosts } from './mdxRepository';
import { mergePosts } from './mergePosts.utils';
import { getSanityPosts } from './sanityRepository';

export const getPosts = cache(async () => {
  const [sanityPosts, mdxPosts] = await Promise.all([getSanityPosts(), getMdxPosts()]);

  return mergePosts([...sanityPosts, ...mdxPosts]);
});
