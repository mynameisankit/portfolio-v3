import { useCopy } from '@/app/_components/localization/useCopy';
import { ConditionalRenderer } from '@/app/_components/ui/ConditionalRenderer';
import { type Category, getCategory, type Post } from '@/data/blog/model';
import { cn } from '@/lib/utils';
import { EmptyBlog } from './EmptyBlog';
import { PostCard } from './PostCard';
import { useMasonry } from './useMasonry';

export function ArchiveResults({
  query,
  selected,
  page,
  results,
  visible,
  updateSearch,
}: {
  query: string;
  selected?: Category;
  page: number;
  results: Post[];
  visible: Post[];
  updateSearch: (value: string) => void;
}) {
  const copy = useCopy();
  const categoryLabel = getCategory(selected ?? '')?.label;
  const resultRange = `${(page - 1) * 9 + 1}–${Math.min(page * 9, results.length)} ${copy('of')} ${results.length}`;
  const masonry = useMasonry(`${selected}:${page}:${query}`, !query.trim());

  return (
    <>
      <div className="blog-results-heading flex justify-between items-center gap-4 mt-6 mx-0 mb-[18px]">
        <h2 className="text-[18px] font-normal">
          {copy(query.trim() ? 'Search results' : 'Latest articles')}
        </h2>
        <p className="font-mono text-[12px] text-muted-foreground" role="status" aria-live="polite">
          {results.length ? resultRange : copy('0 articles')}
        </p>
      </div>
      {!!results.length && (
        <div
          ref={masonry}
          className={cn(
            'blog-tiles group/archive relative gap-[22px]',
            query.trim()
              ? 'blog-list block'
              : 'grid grid-cols-3 data-[ready=true]:block max-[801px]:grid-cols-2 max-[521px]:grid-cols-1',
          )}
        >
          <div
            className="blog-sizer hidden [width:calc((100%_-_44px)_/_3)] max-[801px]:[width:calc((100%_-_22px)_/_2)] max-[521px]:w-full"
            aria-hidden="true"
          />
          {visible.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} isList={!!query.trim()} />
          ))}
        </div>
      )}
      <ConditionalRenderer shouldRender={!results.length}>
        <EmptyBlog
          category={categoryLabel}
          isSearching={!!query.trim()}
          onClear={() => updateSearch('')}
        />
      </ConditionalRenderer>
    </>
  );
}
