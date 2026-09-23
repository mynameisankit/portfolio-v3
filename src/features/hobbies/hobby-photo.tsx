'use client';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
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
          <span>Your photo here</span>
        </span>
      )}
      <span className="photo-caption">{selected.name}</span>
      <span className="photo-counter">
        0{hobby + 1} / 0{hobbies.length} · Next photo →
      </span>
    </Button>
  );
}
