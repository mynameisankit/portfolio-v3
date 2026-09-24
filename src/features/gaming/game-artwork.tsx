'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { SteamGame } from './model';

export function GameArtwork({ game }: { game: SteamGame }) {
  const [failed, setFailed] = useState(false);
  const source = failed ? game.fallbackImage || '/favicon.svg' : game.image;
  return source ? (
    <Image
      className="game-artwork"
      src={source}
      alt=""
      width={460}
      height={215}
      unoptimized
      onError={() => setFailed(true)}
    />
  ) : null;
}
