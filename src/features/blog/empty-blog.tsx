import Link from 'next/link';

import { Button } from '@/components/ui/button';

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
      <p className="eyebrow">{searching ? 'Search' : (category ?? 'Writing')}</p>
      <h2 id="empty-title">{searching ? 'No matching posts.' : 'No posts here yet.'}</h2>
      <p>
        {searching
          ? 'Try a different keyword or browse another category.'
          : 'This space is ready for the first post. In the meantime, you can explore the rest of the site.'}
      </p>
      <div className="blog-empty-actions">
        {searching ? (
          <Button onClick={onClear}>Clear search</Button>
        ) : (
          <Button asChild>
            <Link href="/#projects">Explore projects ↗</Link>
          </Button>
        )}
        {category && (
          <Button variant="outline" asChild>
            <Link href="/blogs">All writing</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
