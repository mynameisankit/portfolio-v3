'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Text } from '@/app/_components/localization/Text';
import { Button } from '@/app/_components/ui/Button';
import type { PortfolioContent } from '@/data/portfolio/content';
import { ImageIcon } from 'lucide-react';

export function HobbyPhoto({
  hobbies,
  isHidden,
}: {
  hobbies: PortfolioContent['hobbies'];
  isHidden: boolean;
}) {
  const [hobby, setHobby] = useState(0);
  const selected = hobbies[hobby];
  if (!selected) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      className="hobby-photo [&[hidden]]:hidden! col-start-2 row-start-1 justify-self-center w-[80%] pt-3 px-3 pb-[15px] border border-border bg-card text-foreground [transform:rotate(calc(var(--tilt)_*_-2))] mt-5 rounded-xs text-left shadow-[0_15px_28px_#0003] max-[721px]:col-auto max-[721px]:row-auto max-[721px]:mt-0 max-[721px]:order-3 max-[721px]:w-[75%] max-[721px]:justify-self-end block h-auto whitespace-normal"
      hidden={isHidden}
      onClick={() => setHobby((hobby + 1) % hobbies.length)}
      aria-label={`Showing ${selected.name}. Show next hobby.`}
    >
      {!!selected.image && (
        <Image
          className="w-full aspect-[1.28] object-cover"
          src={selected.image}
          alt={selected.caption}
          width={480}
          height={375}
        />
      )}
      {!selected.image && (
        <span className="photo-placeholder aspect-[1.28] bg-secondary text-muted-foreground border border-dashed border-border flex flex-col gap-3 items-center justify-center font-mono text-[12px] uppercase tracking-[1px]">
          <ImageIcon size={26} />
          <span>
            <Text>Your photo here</Text>
          </span>
        </span>
      )}
      <span className="photo-caption block italic font-[Georgia,serif] text-[28px] leading-[1.3] mt-3">
        <Text>{selected.name}</Text>
      </span>
      <span className="photo-counter block font-mono text-[12px] leading-[1.6] text-muted-foreground mt-[7px]">
        0{hobby + 1} / 0{hobbies.length}
        <Text>· Next photo →</Text>
      </span>
    </Button>
  );
}
