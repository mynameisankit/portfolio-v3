import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { categories, type Category, type Post } from '@/data/blog/model';

export function ArchiveCategories({
  posts,
  selected,
  categoryHref,
}: {
  posts: Post[];
  selected?: Category;
  categoryHref: (slug: string) => string;
}) {
  return (
    <nav
      className="blog-categories flex flex-wrap gap-2 mt-[18px] mx-0 mb-7 [&_a[aria-current='page']]:bg-primary [&_a[aria-current='page']]:text-primary-foreground max-[521px]:gap-[6px] max-[521px]:[&_a]:p-2 max-[521px]:[&_a]:text-[13px]"
      aria-label="Blog categories"
    >
      {[{ slug: '', label: 'All writing' }, ...categories].map((item) => (
        <Link
          className="flex items-center gap-[10px] py-2 px-3 min-h-11 border border-border rounded-[5px] text-[14px]"
          key={item.slug}
          href={categoryHref(item.slug)}
          aria-current={(selected ?? '') === item.slug ? 'page' : undefined}
        >
          <Text>{item.label}</Text>
          <span className="font-mono text-[11px]">
            {posts.filter((post) => !item.slug || post.category === item.slug).length}
          </span>
        </Link>
      ))}
    </nav>
  );
}
