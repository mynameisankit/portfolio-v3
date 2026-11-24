'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { SteamGame } from '@/data/gaming/model';

const ARTWORK_WIDTH = 460;
const ARTWORK_HEIGHT = 215;

export function GameArtwork({ game }: { game: SteamGame }) {
  const [hasFailed, setHasFailed] = useState(false);
  const fallback = game.fallbackImage ?? '/favicon.svg';
  const source = hasFailed ? fallback : game.image;

  if (source) {
    return (
      <Image
        className="game-artwork w-full h-auto rounded-md aspect-[460_/_215] object-contain bg-muted"
        src={source}
        alt=""
        width={ARTWORK_WIDTH}
        height={ARTWORK_HEIGHT}
        loading="lazy"
        unoptimized
        onError={() => setHasFailed(true)}
      />
    );
  }

  return null;
}
