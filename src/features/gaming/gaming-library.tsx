import './gaming.css';

import { Text } from '@/features/localization/text';

import { GameCard } from './game-card';
import type { GameLibrary } from './model';
import { SteamProfilePreview } from './steam-profile-preview';

export function GamingLibrary({ library }: { library: GameLibrary }) {
  const ranked = library.mode === 'most-played';
  return (
    <section id="gaming" className="hobby-section" aria-labelledby="gaming-title">
      <h2 id="gaming-title">
        <Text>{'Gaming'}</Text>
      </h2>
      <p className="gaming-intro">
        <Text>
          {ranked
            ? 'My most-played Steam games, ranked by total playtime.'
            : 'What I have been playing lately, from my public Steam profile.'}
        </Text>
      </p>
      <SteamProfilePreview avatar={library.avatar} />
      {library.games.length ? (
        <>
          <div className="gaming-meta">
            <span>
              <Text>
                {ranked ? 'Most played · Up to 25 games' : 'Recent activity · Profile order'}
              </Text>
            </span>
            <span>
              <Text>{'Updated'}</Text> {library.updatedAt?.slice(0, 10)}
            </span>
          </div>
          <ul className="gaming-grid">
            {library.games.map((game, index) => (
              <GameCard key={game.appid} game={game} rank={ranked ? index + 1 : undefined} />
            ))}
          </ul>
        </>
      ) : (
        <div className="gaming-empty">
          <span aria-hidden="true">
            <Text>{'[ pause ]'}</Text>
          </span>
          <h3>
            <Text>
              {library.status === 'ready'
                ? 'No games to show yet.'
                : 'Recent activity is unavailable.'}
            </Text>
          </h3>
          <p>
            <Text>{'You can still explore my games on Steam.'}</Text>
          </p>
        </div>
      )}
    </section>
  );
}
