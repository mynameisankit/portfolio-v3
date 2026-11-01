import type { ArticleHeading, ArticleHeadingNode } from './model';

export function buildHeadingTree(headings: ArticleHeading[]): ArticleHeadingNode[] {
  const roots: ArticleHeadingNode[] = [];
  const ancestors: ArticleHeadingNode[] = [];
  for (const heading of headings) {
    const node: ArticleHeadingNode = { ...heading, children: [] };
    while (ancestors.length && ancestors[ancestors.length - 1].depth >= node.depth) {
      ancestors.pop();
    }
    const parent = ancestors[ancestors.length - 1];
    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
    ancestors.push(node);
  }

  return roots;
}
