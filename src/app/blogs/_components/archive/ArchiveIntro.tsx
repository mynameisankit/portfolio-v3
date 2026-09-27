import { Text } from '@/app/_components/localization/Text';
import { useCopy } from '@/app/_components/localization/useCopy';
import { type Category, getCategory } from '@/data/blog/model';

export function ArchiveIntro({ selected }: { selected?: Category }) {
  const copy = useCopy();
  const category = getCategory(selected ?? '');
  const heading = category?.label ?? 'Writing.';
  const description = category?.description ?? 'Software, places, and games worth talking about.';

  return (
    <div className="blog-intro [&_>_p:last-child]:text-muted-foreground">
      <p className="eyebrow font-mono text-[12px] leading-[1.6] tracking-[1.2px] uppercase text-muted-foreground">
        <Text>/blogs</Text>
        {selected && <>/{selected}</>}
      </p>
      <h1 className="text-[clamp(38px,_6vw,_64px)] leading-[1.1] tracking-[-2px] my-3 mx-0 font-normal">
        <Text>{heading}</Text>
      </h1>
      <p>{copy(description)}</p>
    </div>
  );
}
