import type { Post } from '@/data/blog/model';

export function getOpenGraphImages(post: Post | undefined) {
  if (!post?.cover?.url) {
    return [];
  }

  return [{ url: post.cover.url, alt: post.cover.alt }];
}
