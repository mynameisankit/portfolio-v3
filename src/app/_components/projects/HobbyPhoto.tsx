'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Text } from '@/app/_components/localization/Text';
import type { PortfolioContent } from '@/data/portfolio/content';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

export function HobbyPhoto({
  hobbies,
  isHidden,
}: {
  hobbies: PortfolioContent['hobbies'];
  isHidden: boolean;
}) {
  const photos = hobbies.filter((item) => !!item.image);
  const items = photos.length ? photos : hobbies;
  const [photoIndex, setPhotoIndex] = useState(0);
  const selectedIndex = photoIndex % items.length;
  const selected = items[selectedIndex];
  if (!selected) {
    return null;
  }

  return (
    <button
      type="button"
      className="hobby-photo group/photo [&[hidden]]:hidden! col-start-2 row-start-1 justify-self-center w-full p-3 pb-5 border border-border bg-card text-foreground [transform:rotate(calc(var(--tilt)_*_-0.65))] rounded-lg text-left shadow-[0_15px_28px_#0003] motion-safe:transition-shadow motion-safe:duration-300 hover:shadow-[0_20px_40px_#0004] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 max-[721px]:col-auto max-[721px]:row-auto max-[721px]:order-3 block"
      hidden={isHidden}
      onClick={() => setPhotoIndex((index) => (index + 1) % items.length)}
      aria-label={`${selected.name}. ${selectedIndex + 1} / ${items.length}`}
    >
      <span className="relative block aspect-[1.28] overflow-hidden rounded-sm bg-secondary">
        {items.map((item, index) => (
          <span
            key={`${item.name}-${index}`}
            aria-hidden={index !== selectedIndex}
            className={cn(
              'absolute inset-0 block motion-safe:transition-opacity motion-safe:duration-500',
              index === selectedIndex ? 'opacity-100' : 'opacity-0',
            )}
          >
            {!!item.image && (
              <Image
                className="h-full w-full object-contain"
                src={item.image}
                alt={item.caption || item.name}
                fill
                sizes="(max-width: 721px) 86vw, 480px"
              />
            )}
            {!item.image && (
              <span className="h-full border border-dashed border-border text-muted-foreground flex flex-col gap-3 items-center justify-center font-mono text-xs uppercase tracking-wider">
                <ImageIcon size={26} />
                <Text>Your photo here</Text>
              </span>
            )}
          </span>
        ))}
      </span>
      <span className="photo-caption block text-[30px] leading-[1.3] mt-4">
        <Text>{selected.name}</Text>
      </span>
      <span
        className="photo-counter flex items-center justify-between font-mono text-xs text-muted-foreground mt-3"
        aria-live="polite"
      >
        <span>
          {String(selectedIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        {items.length > 1 && (
          <span>
            <Text>· Next photo →</Text>
          </span>
        )}
      </span>
    </button>
  );
}
