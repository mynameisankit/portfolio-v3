import { Text } from '@/app/_components/localization/Text';
import { buildHeadingTree } from '@/data/blog/headingTree.utils';
import type { ArticleHeading } from '@/data/blog/model';
import { ContentsList } from './ContentsList';

export function TableOfContents({ headings = [] }: { headings?: ArticleHeading[] }) {
  if (!headings.length) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className="my-8 rounded-md border border-border bg-card p-5"
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        <Text>On this page</Text>
      </p>
      <ContentsList headings={buildHeadingTree(headings)} />
    </nav>
  );
}
