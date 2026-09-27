import { Suspense } from 'react';
import { BlogArchive } from '@/app/blogs/_components/archive/BlogArchive';

export const metadata = { title: 'Empty state preview | Ankit Kumar', robots: { index: false } };
export default function EmptyPreview() {
  return (
    <Suspense fallback={<p className="blog-loading py-10 px-[5%]">Loading preview…</p>}>
      <BlogArchive posts={[]} />
    </Suspense>
  );
}
