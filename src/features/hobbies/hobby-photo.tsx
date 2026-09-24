'use client';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Text } from '@/features/localization/text';
import type { PortfolioContent } from '@/features/portfolio/content';
export function HobbyPhoto({
  hobbies,
  hidden,
}: {
  hobbies: PortfolioContent['hobbies'];
  hidden: boolean;
}) {
  const [hobby, setHobby] = useState(0);
  const selected = hobbies[hobby];
  if (!selected) {
    return null;
  }
  return (
    <Button
      variant="ghost"
      className="hobby-photo block h-auto whitespace-normal"
      hidden={hidden}
      onClick={() => setHobby((hobby + 1) % hobbies.length)}
      aria-label={`Showing ${selected.name}. Show next hobby.`}
    >
      {selected.image ? (
        <Image src={selected.image} alt={selected.caption} width={480} height={375} />
      ) : (
        <span className="photo-placeholder">
          <ImageIcon size={26} />
          <span>
            <Text>{'Your photo here'}</Text>
          </span>
        </span>
      )}
      <span className="photo-caption">{<Text>{selected.name}</Text>}</span>
      <span className="photo-counter">
        0{hobby + 1} / 0{hobbies.length}
        <Text>{'· Next photo →'}</Text>
      </span>
    </Button>
  );
}
