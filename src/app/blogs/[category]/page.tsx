import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { BlogArchive } from '@/app/blogs/_components/archive/BlogArchive';
import { categories, getCategory } from '@/data/blog/model';
import { getPosts } from '@/data/blog/repository';

export const dynamicParams = false;
export async function generateStaticParams() {
  return categories.map(({ slug }) => ({ category: slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  return {
    title: getCategory(category)?.label ?? 'Writing',
    description: getCategory(category)?.description,
    alternates: { canonical: `/blogs/${category}` },
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
    <Suspense fallback={<p className="blog-loading py-10 px-[5%]">Loading articles…</p>}>
      <BlogArchive posts={posts} category={selected.slug} />
    </Suspense>
  );
}
