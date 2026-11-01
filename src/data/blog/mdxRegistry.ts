// Explicit imports keep article dependencies visible to the Next.js bundler.
// Register each local article once. Metadata stays inside its MDX file.
export const mdxRegistry = {
  interactiveMdx: {
    file: 'interactiveMdx/index.mdx',
    load: () => import('@/content/blog/interactiveMdx/index.mdx'),
  },
};
