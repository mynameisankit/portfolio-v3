import { Text } from '@/app/_components/localization/Text';
import { useCopy } from '@/app/_components/localization/useCopy';
import { Button } from '@/app/_components/ui/Button';
import { ConditionalRenderer } from '@/app/_components/ui/ConditionalRenderer';

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
      className="blog-search mt-6 [&_>_div]:flex [&_>_div]:items-center [&_>_div]:rounded-md [&_>_div]:border [&_>_div]:border-border [&_>_div]:bg-secondary [&_>_div]:px-3 [&_>_div]:py-[5px] [&_>_div]:transition-[border-color,box-shadow] [&_>_div]:duration-200 [&_>_div]:focus-within:border-primary [&_>_div]:focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,_var(--primary)_18%,_transparent)] [&_>_div]:motion-reduce:transition-none"
      role="search"
    >
      <label className="block mb-2 text-[13px]" htmlFor="blog-query">
        <Text>Search articles</Text>
      </label>
      <div>
        <input
          className="w-full min-w-0 border-0 bg-transparent px-0 py-[10px] text-[16px] text-foreground placeholder:text-muted-foreground outline-none [font:16px/1.6_inherit]"
          id="blog-query"
          type="search"
          value={query}
          onChange={(event) => updateSearch(event.target.value)}
          placeholder={copy('Search titles, topics, or keywords…')}
        />
        <ConditionalRenderer shouldRender={!!query}>
          <Button variant="ghost" onClick={() => updateSearch('')}>
            <Text>Clear</Text>
          </Button>
        </ConditionalRenderer>
      </div>
    </div>
  );
}
