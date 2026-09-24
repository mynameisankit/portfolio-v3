import { notFound } from 'next/navigation';

import { BlogArticle } from '@/features/blog/blog-article';
import { categories } from '@/features/blog/model';
import { getPosts } from '@/features/blog/repository';
export const dynamicParams = false;
export async function generateStaticParams() {
  const posts = await getPosts();
  return categories.flatMap(({ slug: category }) => {
    const published = posts.filter((post) => post.category === category);
    // Reserved paths render 404 while letting an empty category export successfully.
    return published.length
      ? published.map(({ slug }) => ({ category, slug }))
      : [{ category, slug: '__empty__' }];
  });
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const posts = await getPosts();
  const post = posts.find((item) => item.category === category && item.slug === slug);
  return {
    title: `${post?.title ?? 'Article'} | Ankit Kumar`,
    description: post?.description,
    robots: { index: true, follow: true },
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const posts = await getPosts();
  const post = posts.find((item) => item.category === category && item.slug === slug);
  if (!post) {
    notFound();
  }
  return <BlogArticle post={post} />;
}
