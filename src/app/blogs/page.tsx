import { Suspense } from 'react';
import { BlogArchive } from '@/app/blogs/_components/archive/BlogArchive';
import { getPosts } from '@/data/blog/repository';

export const metadata = { title: 'Writing | Ankit Kumar', robots: { index: true, follow: true } };
export default async function BlogsPage() {
  const posts = await getPosts();

  return (
    <Suspense fallback={<p className="blog-loading py-10 px-[5%]">Loading articles…</p>}>
      <BlogArchive posts={posts} />
    </Suspense>
  );
}
