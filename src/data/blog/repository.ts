import { cache } from 'react';
import { getMdxPosts } from './mdxRepository';
import { mergePosts } from './mergePosts.utils';
import { getSanityPosts } from './sanityRepository';

export const getPosts = cache(async () => {
  const [technical, stories] = await Promise.all([getMdxPosts(), getSanityPosts()]);

  return mergePosts([...technical, ...stories]);
});
