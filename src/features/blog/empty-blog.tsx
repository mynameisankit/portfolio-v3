import { Button } from '@/components/ui/button';
import Link from '@/features/localization/link';
import { Text } from '@/features/localization/text';

export function EmptyBlog({
  category,
  searching,
  onClear,
}: {
  category?: string;
  searching: boolean;
  onClear: () => void;
}) {
  return (
    <section className="blog-empty" aria-labelledby="empty-title">
      <div className="blog-empty-paper" aria-hidden="true">
        <span>01</span>
        <div />
        <div />
        <div />
      </div>
      <p className="eyebrow">{<Text>{searching ? 'Search' : (category ?? 'Writing')}</Text>}</p>
      <h2 id="empty-title">
        {<Text>{searching ? 'No matching posts.' : 'No posts here yet.'}</Text>}
      </h2>
      <p>
        {
          <Text>
            {searching
              ? 'Try a different keyword or browse another category.'
              : 'This space is ready for the first post. In the meantime, you can explore the rest of the site.'}
          </Text>
        }
      </p>
      <div className="blog-empty-actions">
        {searching ? (
          <Button onClick={onClear}>
            <Text>{'Clear search'}</Text>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/#projects">
              <Text>{'Explore projects ↗'}</Text>
            </Link>
          </Button>
        )}
        {category && (
          <Button variant="outline" asChild>
            <Link href="/blogs">
              <Text>{'All writing'}</Text>
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
