import Link from 'next/link';
import { notFound } from 'next/navigation';

import { posts } from '@/features/blog/content';
import { getCategory } from '@/features/blog/model';
export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map(({ category, slug }) => ({ category, slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const post = posts.find((item) => item.category === category && item.slug === slug);
  return {
    title: `${post?.title ?? 'Article'} | Ankit Kumar`,
    description: post?.description,
    robots: { index: false, follow: true },
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const post = posts.find((item) => item.category === category && item.slug === slug);
  if (!post) {
    notFound();
  }
  return (
    <article className="blog-reader">
      <Link href={`/blogs/${category}`}>← {getCategory(category)?.label}</Link>
      <p className="eyebrow">
        {post.sample ? 'Sample article · ' : ''}
        {post.minutes} min read
      </p>
      <h1>{post.title}</h1>
      <p className="blog-lede">{post.description}</p>
      {post.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <hr />
      <Link href="/blogs">Browse all writing ↗</Link>
    </article>
  );
}
