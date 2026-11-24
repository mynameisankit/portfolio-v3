import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import { mdxRegistry } from './mdxRegistry';
import type { ArticleHeading, Post } from './model';
import GithubSlugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { z } from 'zod';

const metadataSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  category: z.enum(['technical', 'travelling', 'video-games']),
  description: z.string().min(1).max(240),
  date: z.string().datetime({ offset: true }),
  tags: z.array(z.string()).default([]),
  isDraft: z.boolean().default(false),
  cover: z
    .object({ url: z.string().url(), alt: z.string().min(1), lqip: z.string().default('') })
    .nullable()
    .optional(),
});

export const getMdxArticles = cache(async () => {
  return Promise.all(
    Object.values(mdxRegistry).map(async ({ file, load }) => {
      const [module, source] = await Promise.all([
        load(),
        readFile(path.join(process.cwd(), 'src/content/blog', file), 'utf8'),
      ]);
      const { isDraft, ...metadata } = metadataSchema.parse(module.post);
      const tree = unified().use(remarkParse).use(remarkMdx).parse(source);
      const slugger = new GithubSlugger();
      const headings: ArticleHeading[] = [];
      visit(tree, 'heading', (node) => {
        const text = toString(node, { includeImageAlt: false, includeHtml: false });
        const id = slugger.slug(text);
        headings.push({ id, text, depth: node.depth });
      });
      const prose: string[] = [];
      visit(tree, 'text', (node) => {
        prose.push(node.value);
      });
      const text = prose.join(' ');
      const post: Post = {
        ...metadata,
        body: [text],
        minutes: Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 220)),
        headings,
      };

      return { post, isDraft, Content: module.default };
    }),
  );
});

export async function getMdxPosts() {
  const articles = await getMdxArticles();

  return articles
    .filter(({ post, isDraft }) => !isDraft && Date.parse(post.date) <= Date.now())
    .map(({ post }) => post);
}
