import { ArticleLink } from '@/app/blogs/_components/article/ArticleLink';
import type { MDXComponents } from 'mdx/types';

const components: MDXComponents = { a: ArticleLink };

export function useMDXComponents(): MDXComponents {
  return components;
}
