'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';

import { EmptyBlog } from './empty-blog';
import { categories, type Category, getCategory, type Post } from './model';
import { BlogPagination } from './pagination';
import { PostCard } from './post-card';
import { createPostSearch } from './search';
import { useMasonry } from './use-masonry';

export function BlogArchive({ posts, category }: { posts: Post[]; category?: Category }) {
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
  const results = useMemo(
    () => (query.trim() ? search.search(query.trim()).map(({ item }) => item) : scope),
    [query, scope, search],
  );
  const pages = Math.max(1, Math.ceil(results.length / 9));
  const requestedPage = Number(params.get('page') ?? 1);
  const page = Number.isFinite(requestedPage)
    ? Math.min(pages, Math.max(1, Math.floor(requestedPage)))
    : 1;
  const visible = results.slice((page - 1) * 9, page * 9);
  const masonry = useMasonry(`${selected}:${page}:${query}`, !query.trim());
  function updateSearch(value: string) {
    const next = new URLSearchParams(params);
    if (value) {
      next.set('q', value);
    } else {
      next.delete('q');
    }
    next.delete('page');
    // Native history updates are integrated with Next's search-parameter subscription.
    window.history.replaceState(null, '', pathname + (next.size ? `?${next}` : ''));
  }
  function changePage(nextPage: number) {
    const next = new URLSearchParams(params);
    next.set('page', String(nextPage));
    router.push(`${pathname}?${next}`, { scroll: false });
  }
  return (
    <section className="blog-archive">
      <div className="blog-intro">
        <p className="eyebrow">/blogs{selected ? `/${selected}` : ''}</p>
        <h1>{selected ? getCategory(selected)?.label : 'Writing.'}</h1>
        <p>
          {selected
            ? getCategory(selected)?.description
            : 'Software, places, and games worth talking about.'}
        </p>
      </div>
      {posts.some((post) => post.sample) && (
        <p className="blog-notice">Layout preview — these articles are sample content.</p>
      )}
      <div className="blog-search" role="search">
        <label htmlFor="blog-query">Search articles</label>
        <div>
          <input
            id="blog-query"
            type="search"
            value={query}
            onChange={(event) => updateSearch(event.target.value)}
            placeholder="Search titles, topics, or keywords…"
          />
          {query && (
            <Button variant="ghost" onClick={() => updateSearch('')}>
              Clear
            </Button>
          )}
        </div>
      </div>
      <nav className="blog-categories" aria-label="Blog categories">
        {[{ slug: '', label: 'All writing' }, ...categories].map((item) => (
          <Link
            key={item.slug}
            href={`/blogs${
              item.slug ? `/${item.slug}` : ''
            }${query ? `?q=${encodeURIComponent(query)}` : ''}`}
            aria-current={(selected ?? '') === item.slug ? 'page' : undefined}
          >
            {item.label}
            <span>{posts.filter((post) => !item.slug || post.category === item.slug).length}</span>
          </Link>
        ))}
      </nav>
      <div className="blog-results-heading">
        <h2>{query.trim() ? 'Search results' : 'Latest articles'}</h2>
        <p role="status" aria-live="polite">
          {results.length
            ? `${(page - 1) * 9 + 1}–${Math.min(page * 9, results.length)} of ${results.length}`
            : '0 articles'}
        </p>
      </div>
      {results.length ? (
        <div ref={masonry} className={`blog-tiles${query.trim() ? ' blog-list' : ''}`}>
          <div className="blog-sizer" aria-hidden="true" />
          {visible.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      ) : (
        <EmptyBlog
          category={selected ? getCategory(selected)?.label : undefined}
          searching={!!query.trim()}
          onClear={() => updateSearch('')}
        />
      )}
      <BlogPagination page={page} pages={pages} onChange={changePage} />
    </section>
  );
}
