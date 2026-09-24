import { Suspense } from 'react';

import { BlogArchive } from '@/features/blog/blog-archive';
import { posts } from '@/features/blog/content';
export const metadata = { title: 'Sample archive preview', robots: { index: false } };
export default function SampleArchive() {
  return (
    <Suspense fallback={<p>Loading preview…</p>}>
      <BlogArchive posts={posts} />
    </Suspense>
  );
}
