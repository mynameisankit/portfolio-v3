import { notFound } from 'next/navigation';
import { BlogArticle } from '@/app/blogs/_components/article/BlogArticle';
import { categories } from '@/data/blog/model';
import { getPosts } from '@/data/blog/repository';
import { getOpenGraphImages } from './metadataHelpers';

export const dynamicParams = false;
export async function generateStaticParams() {
  const posts = await getPosts();

  return categories.flatMap(({ slug: category }) => {
    const published = posts.filter((post) => post.category === category);

    // Reserved paths render 404 while letting an empty category export successfully.
    if (published.length) {
      return published.map(({ slug }) => ({ category, slug }));
    }

    return [{ category, slug: '__empty__' }];
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
    title: post?.title ?? 'Article',
    description: post?.description,
    alternates: { canonical: `/blogs/${category}/${slug}` },
    openGraph: {
      type: 'article',
      publishedTime: post?.date,
      images: getOpenGraphImages(post),
    },
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
