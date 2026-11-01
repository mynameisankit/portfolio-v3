import { BlogArticle } from '@/app/blogs/_components/article/BlogArticle';
import { MdxArticleBody } from '@/app/blogs/_components/article/MdxArticleBody';
import { getMdxArticles } from '@/data/blog/mdxRepository';

export const metadata = {
  title: 'MDX article preview',
  robots: { index: false, follow: false },
};

export default async function MdxPreviewPage() {
  const articles = await getMdxArticles();
  const article = articles.find(
    ({ post }) => post.slug === 'interactive-mdx' && post.category === 'technical',
  );
  if (!article) {
    throw new Error('The interactive MDX example is missing from the registry.');
  }

  return (
    <BlogArticle post={{ ...article.post, isSample: true }}>
      <MdxArticleBody post={article.post} />
    </BlogArticle>
  );
}
