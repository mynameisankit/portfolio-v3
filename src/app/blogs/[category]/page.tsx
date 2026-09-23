import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { BlogArchive } from '@/features/blog/blog-archive';
import { posts } from '@/features/blog/content';
import { categories, getCategory } from '@/features/blog/model';
export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map(({ slug }) => ({ category: slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return {
    title: `${getCategory(category)?.label ?? 'Writing'} | Ankit Kumar`,
    robots: { index: false, follow: true },
  };
}
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
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
