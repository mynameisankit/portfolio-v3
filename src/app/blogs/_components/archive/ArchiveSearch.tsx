import { Text } from '@/app/_components/localization/Text';
import { useCopy } from '@/app/_components/localization/useCopy';
import { Button } from '@/app/_components/ui/Button';

export function ArchiveSearch({
  query,
  updateSearch,
}: {
  query: string;
  updateSearch: (value: string) => void;
}) {
  const copy = useCopy();

  return (
    <div
      className="blog-search mt-6 [&_>_div]:flex [&_>_div]:items-center [&_>_div]:bg-secondary [&_>_div]:border [&_>_div]:border-border [&_>_div]:rounded-md [&_>_div]:py-[5px] [&_>_div]:px-3"
      role="search"
    >
      <label className="block mb-2 text-[13px]" htmlFor="blog-query">
        <Text>Search articles</Text>
      </label>
      <div>
        <input
          className="w-full min-w-0 py-[10px] px-0 [font:16px/1.6_inherit] text-[16px] bg-transparent border-0 text-foreground placeholder:text-muted-foreground"
          id="blog-query"
          type="search"
          value={query}
          onChange={(event) => updateSearch(event.target.value)}
          placeholder={copy('Search titles, topics, or keywords…')}
        />
        {query && (
          <Button variant="ghost" onClick={() => updateSearch('')}>
            <Text>Clear</Text>
          </Button>
        )}
      </div>
    </div>
  );
}
