import { Text } from '@/app/_components/localization/Text';
import type { ArticleHeadingNode } from '@/data/blog/model';

export function ContentsList({ headings }: { headings: ArticleHeadingNode[] }) {
  if (!headings.length) {
    return null;
  }

  return (
    <ol className="flex flex-col gap-2 text-sm [&_li]:!my-0 [&_ol]:mt-2 [&_ol]:border-l [&_ol]:border-border [&_ol]:pl-4">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className="block leading-6 text-muted-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:underline"
          >
            <Text>{heading.text}</Text>
          </a>
          <ContentsList headings={heading.children} />
        </li>
      ))}
    </ol>
  );
}
