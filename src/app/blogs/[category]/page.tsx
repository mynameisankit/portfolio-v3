import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { BlogArchive } from '@/features/blog/blog-archive';
import { categories, getCategory } from '@/features/blog/model';
import { getPosts } from '@/features/blog/repository';
export const dynamicParams = false;
export async function generateStaticParams() {
  return categories.map(({ slug }) => ({ category: slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return {
    title: `${getCategory(category)?.label ?? 'Writing'} | Ankit Kumar`,
    robots: { index: true, follow: true },
  };
}
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const posts = await getPosts();
  const selected = getCategory(category);
  if (!selected) {
    notFound();
  }
  return (
    <Suspense fallback={<p className="blog-loading">Loading articles…</p>}>
      <BlogArchive posts={posts} category={selected.slug} />
    </Suspense>
  );
}
