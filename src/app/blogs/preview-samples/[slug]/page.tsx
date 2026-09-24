import { notFound } from 'next/navigation';

import { BlogArticle } from '@/features/blog/blog-article';
import { posts } from '@/features/blog/content';
export const metadata = { title: 'Sample article preview', robots: { index: false } };
export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}
export default async function SamplePost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) {
    notFound();
  }
  return <BlogArticle post={post} />;
}
