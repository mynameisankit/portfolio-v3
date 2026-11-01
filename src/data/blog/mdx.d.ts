declare module '*.mdx' {
  export const post: unknown;
  const Content: import('mdx/types').MDXContent;
  export default Content;
}
