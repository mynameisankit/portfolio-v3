import { Suspense } from 'react';

import { BlogArchive } from '@/features/blog/blog-archive';
import { getPosts } from '@/features/blog/repository';
export const metadata = { title: 'Writing | Ankit Kumar', robots: { index: true, follow: true } };
export default async function BlogsPage() {
  const posts = await getPosts();
  return (
    <Suspense fallback={<p className="blog-loading">Loading articles…</p>}>
      <BlogArchive posts={posts} />
    </Suspense>
  );
}
