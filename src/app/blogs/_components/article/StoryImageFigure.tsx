import Image from 'next/image';
import { ConditionalRenderer } from '@/app/_components/ui/ConditionalRenderer';
import type { StoryImage } from '@/data/blog/sanityRepository';

export function StoryImageFigure({ value }: { value: StoryImage }) {
  return (
    <figure>
      <Image
        className="h-auto w-full rounded-md"
        src={`${value.url}?w=1460&fit=max&auto=format`}
        alt={value.alt}
        width={value.width}
        height={value.height}
      />
      <ConditionalRenderer shouldRender={!!value.caption}>
        <figcaption>{value.caption}</figcaption>
      </ConditionalRenderer>
    </figure>
  );
}
