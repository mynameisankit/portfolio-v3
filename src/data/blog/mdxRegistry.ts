// Explicit imports keep article dependencies visible to the Next.js bundler.
// Register each local article once. Metadata stays inside its MDX file.
type ArticleModule = { post: unknown; default: import('mdx/types').MDXContent };

export const mdxRegistry: Record<string, { file: string; load: () => Promise<ArticleModule> }> = {};
