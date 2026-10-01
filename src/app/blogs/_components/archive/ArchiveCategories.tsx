import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { Button } from '@/app/_components/ui/Button';
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
      className="blog-categories flex flex-wrap gap-2 mt-[18px] mx-0 mb-7 max-[521px]:gap-[6px] max-[521px]:[&_a]:p-2 max-[521px]:[&_a]:text-[13px]"
      aria-label="Blog categories"
    >
      {[{ slug: '', label: 'All writing' }, ...categories].map((item) => {
        const isCurrentCategory = (selected ?? '') === item.slug;

        return (
          <Button
            key={item.slug}
            asChild
            variant={isCurrentCategory ? 'default' : 'outline'}
            className="h-11 gap-[10px] rounded-[5px] px-3 py-2 text-[14px] motion-reduce:transition-none"
          >
            <Link
              href={categoryHref(item.slug)}
              aria-current={isCurrentCategory ? 'page' : undefined}
            >
              <Text>{item.label}</Text>
              <span className="font-mono text-[11px]">
                {posts.filter((post) => !item.slug || post.category === item.slug).length}
              </span>
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
