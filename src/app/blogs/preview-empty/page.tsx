import { Suspense } from 'react';

import { BlogArchive } from '@/features/blog/blog-archive';
export const metadata = { title: 'Empty state preview | Ankit Kumar', robots: { index: false } };
export default function EmptyPreview() {
  return (
    <Suspense fallback={<p className="blog-loading">Loading preview…</p>}>
      <BlogArchive posts={[]} />
    </Suspense>
  );
}
