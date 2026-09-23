import { Suspense } from 'react';

import { BlogArchive } from '@/features/blog/blog-archive';
import { posts } from '@/features/blog/content';
export const metadata = { title: 'Writing | Ankit Kumar', robots: { index: false, follow: true } };
export default function BlogsPage() {
  return (
    <Suspense fallback={<p className="blog-loading">Loading articles…</p>}>
      <BlogArchive posts={posts} />
    </Suspense>
  );
}
