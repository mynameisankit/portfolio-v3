import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { Button } from '@/app/_components/ui/Button';

export function EmptyBlog({
  category,
  isSearching,
  onClear,
}: {
  category?: string;
  isSearching: boolean;
  onClear: () => void;
}) {
  const sectionLabel = category ?? 'Writing';

  return (
    <section
      className="blog-empty pt-[45px] px-[15px] pb-15 text-center [border-top:1px_solid_var(--border)] [&_>_p:not(.eyebrow)]:text-muted-foreground [&_>_p:not(.eyebrow)]:max-w-110 [&_>_p:not(.eyebrow)]:my-0 [&_>_p:not(.eyebrow)]:mx-auto"
      aria-labelledby="empty-title"
    >
      <div
        className="blog-empty-paper w-[105px] h-[125px] border border-border bg-card mt-0 mx-auto mb-[30px] p-4 [transform:rotate(-5deg)] text-left [&_div:last-child]:w-[60%]"
        aria-hidden="true"
      >
        <span className="text-primary font-mono text-[12px]">01</span>
        <div className="h-[1px] bg-border mt-[14px]" />
        <div className="h-[1px] bg-border mt-[14px]" />
        <div className="h-[1px] bg-border mt-[14px]" />
      </div>
      <p className="eyebrow font-mono text-[12px] leading-[1.6] tracking-[1.2px] uppercase text-muted-foreground">
        <Text>{isSearching ? 'Search' : sectionLabel}</Text>
      </p>
      <h2 className="text-[32px] font-normal my-3 mx-0" id="empty-title">
        <Text>{isSearching ? 'No matching posts.' : 'No posts here yet.'}</Text>
      </h2>
      <p>
        <Text>
          {isSearching
            ? 'Try a different keyword or browse another category.'
            : 'This space is ready for the first post. In the meantime, you can explore the rest of the site.'}
        </Text>
      </p>
      <div className="blog-empty-actions flex flex-wrap justify-center gap-3 mt-6">
        {isSearching && (
          <Button onClick={onClear}>
            <Text>Clear search</Text>
          </Button>
        )}
        {!isSearching && (
          <Button asChild>
            <Link href="/#projects">
              <Text>Explore projects ↗</Text>
            </Link>
          </Button>
        )}
        {category && (
          <Button variant="outline" asChild>
            <Link href="/blogs">
              <Text>All writing</Text>
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
