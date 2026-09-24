'use client';
import { useFormatter } from 'next-intl';

import Link from '@/features/localization/link';
import { Text, useCopy } from '@/features/localization/text';

import { GameArtwork } from './game-artwork';
import type { SteamGame } from './model';

export function GameCard({ game, rank }: { game: SteamGame; rank?: number }) {
  const format = useFormatter();
  const copy = useCopy();
  const hours = format.number(game.playtime_forever / 60, { maximumFractionDigits: 1 });
  return (
    <li className="game-card">
      <GameArtwork game={game} />
      {rank && <div className="game-rank">#{rank}</div>}
      <h3>
        <Link
          href={`https://store.steampowered.com/app/${game.appid}/`}
          preview={{
            title: game.name,
            image: game.image,
            fallbackImage: game.fallbackImage,
            description: `${hours} ${copy('hours on record')}`,
          }}
          target="_blank"
          rel="noreferrer"
        >
          {game.name} ↗
        </Link>
      </h3>
      <p>
        {hours}{' '}
        <span>
          <Text>{'hours on record'}</Text>
        </span>
      </p>
      {game.lastPlayed && (
        <p className="game-last-played">
          <Text>{'Last played'}</Text>{' '}
          <span lang="en">{game.lastPlayed.replace(/^last played(?: on)? /i, '')}</span>
        </p>
      )}
    </li>
  );
}
