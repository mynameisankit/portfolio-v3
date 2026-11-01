import { getMdxArticles } from '@/data/blog/mdxRepository';
import type { Post } from '@/data/blog/model';

export async function MdxArticleBody({ post }: { post: Post }) {
  const articles = await getMdxArticles();
  const article = articles.find(
    ({ post: entry }) => entry.category === post.category && entry.slug === post.slug,
  );
  if (!article) {
    throw new Error(`Missing MDX article: ${post.category}/${post.slug}`);
  }
  const { Content } = article;

  return <Content />;
}
