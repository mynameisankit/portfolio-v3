import { Suspense } from 'react';
import { BlogArchive } from '@/app/blogs/_components/archive/BlogArchive';
import { posts } from '@/data/blog/content';

export const metadata = { title: 'Sample archive preview', robots: { index: false } };
export default function SampleArchive() {
  return (
    <Suspense fallback={<p>Loading preview…</p>}>
      <BlogArchive posts={posts} />
    </Suspense>
  );
}
