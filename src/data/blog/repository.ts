import { cache } from 'react';
import { getMdxPosts } from './mdxRepository';
import { mergePosts } from './mergePosts.utils';

export const getPosts = cache(async () => mergePosts(await getMdxPosts()));
