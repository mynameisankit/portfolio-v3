'use client';
import { useFormatter } from 'next-intl';
import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { useCopy } from '@/app/_components/localization/useCopy';
import type { SteamGame } from '@/data/gaming/model';
import { GameArtwork } from './GameArtwork';

export function GameCard({ game, rank }: { game: SteamGame; rank?: number }) {
  const format = useFormatter();
  const copy = useCopy();
  const hours = format.number(game.playtime_forever / 60, { maximumFractionDigits: 1 });

  return (
    <li className="game-card min-w-0 rounded-[10px] border border-border bg-card p-6">
      <GameArtwork game={game} />
      {rank && (
        <div className="game-rank font-mono text-[13px] leading-[normal] text-primary mt-[18px]">
          #{rank}
        </div>
      )}
      <h3 className="text-[20px] leading-[1.4] my-[22px] mx-0 [overflow-wrap:anywhere]">
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
      <p className="font-mono text-[18px] leading-[normal]">
        {hours}{' '}
        <span className="text-[12px] leading-[normal] text-muted-foreground">
          <Text>hours on record</Text>
        </span>
      </p>
      {game.lastPlayed && (
        <p className="game-last-played mt-3 text-[12px] leading-[1.6] text-muted-foreground">
          <Text>Last played</Text>{' '}
          <span lang="en">{game.lastPlayed.replace(/^last played(?: on)? /i, '')}</span>
        </p>
      )}
    </li>
  );
}
