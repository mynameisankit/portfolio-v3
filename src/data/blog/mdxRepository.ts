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
  title: z.string().trim().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  category: z.literal('technical'),
  description: z.string().trim().max(240).default(''),
  date: z.string().datetime({ offset: true }).optional(),
  tags: z.array(z.string()).default([]),
  isDraft: z.boolean().default(false),
  cover: z.object({
    url: z.union([
      z.string().regex(/^\/(?!\/)\S+$/),
      z
        .string()
        .url()
        .regex(/^https?:\/\//i),
    ]),
    alt: z.string().trim().min(1),
    caption: z.string().optional(),
    lqip: z.string().default(''),
  }),
});

export const getMdxArticles = cache(async () => {
  return Promise.all(
    Object.values(mdxRegistry).map(async ({ file, load }) => {
      const [module, source] = await Promise.all([
        load(),
        readFile(path.join(process.cwd(), 'src/content/blog', file), 'utf8'),
      ]);
      const { isDraft, ...metadata } = metadataSchema.parse(module.post);
      if (!isDraft && !metadata.date) {
        throw new Error(
          `Missing publication date in ${file}. Publish with yarn blog:publish ${file}.`,
        );
      }
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
    .filter(({ post, isDraft }) => {
      if (isDraft) {
        return process.env.NODE_ENV === 'development';
      }

      return post.date && Date.parse(post.date) <= Date.now();
    })
    .map(({ post }) => post);
}
