'use client';
import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type Category, getCategory, type Post } from '@/data/blog/model';
import { createPostSearch } from '@/data/blog/search.utils';
import { POSTS_PER_PAGE } from './archiveNavigation.utils';
import { getArchivePage, withSearchParams } from './archiveNavigation.utils';

export function useBlogArchive(posts: Post[], category?: Category) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = params.get('q') ?? '';
  const selected = category ?? getCategory(params.get('category') ?? '')?.slug;
  const scope = useMemo(
    () =>
      posts
        .filter((post) => !selected || post.category === selected)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [posts, selected],
  );
  const search = useMemo(() => createPostSearch(scope), [scope]);
  const results = useMemo(() => {
    if (query.trim()) {
      return search.search(query.trim()).map(({ item }) => item);
    }

    return scope;
  }, [query, scope, search]);
  const pages = Math.max(1, Math.ceil(results.length / POSTS_PER_PAGE));
  const requestedPage = Number(params.get('page') ?? 1);
  const page = getArchivePage(requestedPage, pages);
  const visible = results.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  function updateSearch(value: string) {
    const next = new URLSearchParams(params);
    if (value) {
      next.set('q', value);
    } else {
      next.delete('q');
    }
    next.delete('page');
    // Native history updates are integrated with Next's search-parameter subscription.
    window.history.replaceState(null, '', withSearchParams(pathname, next));
  }

  function changePage(nextPage: number) {
    const next = new URLSearchParams(params);
    next.set('page', String(nextPage));
    router.push(`${pathname}?${next}`, { scroll: false });
  }

  function categoryHref(slug: string) {
    const next = new URLSearchParams();
    if (query) {
      next.set('q', query);
    }
    const categoryPath = `/blogs/${slug}`;
    const archivePath = slug ? categoryPath : '/blogs';

    return withSearchParams(archivePath, next);
  }

  return { query, selected, results, pages, page, visible, updateSearch, changePage, categoryHref };
}
