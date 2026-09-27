import { Text } from '@/app/_components/localization/Text';
import type { GameLibrary } from '@/data/gaming/model';
import { GameCard } from './GameCard';
import { SteamProfilePreview } from './SteamProfilePreview';

export function GamingLibrary({ library }: { library: GameLibrary }) {
  const isRanked = library.mode === 'most-played';

  return (
    <section
      id="gaming"
      className="hobby-section [&_>_p]:text-muted-foreground mt-14 pt-9 [border-top:1px_solid_var(--border)] [scroll-margin-top:24px] [&_>_h2]:text-[clamp(28px,_4vw,_42px)] [&_>_h2]:font-medium [&_>_h2]:tracking-[-1px] [&_>_h2]:mb-[14px]"
      aria-labelledby="gaming-title"
    >
      <h2 id="gaming-title">
        <Text>Gaming</Text>
      </h2>
      <p className="gaming-intro max-w-140 text-muted-foreground">
        <Text>
          {isRanked
            ? 'My most-played Steam games, ranked by total playtime.'
            : 'What I have been playing lately, from my public Steam profile.'}
        </Text>
      </p>
      <SteamProfilePreview avatar={library.avatar} />
      {!!library.games.length && (
        <>
          <div className="gaming-meta flex flex-wrap justify-between gap-3 font-mono text-[12px] leading-[normal] text-muted-foreground mt-11 mx-0 mb-5">
            <span>
              <Text>
                {isRanked ? 'Most played · Up to 9 games' : 'Recent activity · Profile order'}
              </Text>
            </span>
            <span>
              <Text>Updated</Text> {library.updatedAt?.slice(0, 10)}
            </span>
          </div>
          <ul className="gaming-grid list-none p-0 grid grid-cols-3 gap-4 max-[851px]:grid-cols-2 max-[521px]:grid-cols-1">
            {library.games.map((game, index) => {
              const rank = index + 1;

              return <GameCard key={game.appid} game={game} rank={isRanked ? rank : undefined} />;
            })}
          </ul>
        </>
      )}
      {!library.games.length && (
        <div className="gaming-empty mt-12 py-16 px-5 border border-border rounded-[10px] text-center [&_>_span]:text-primary [&_>_span]:[font-family:monospace]">
          <span aria-hidden="true">
            <Text>[ pause ]</Text>
          </span>
          <h3 className="text-[24px] mt-5 mx-0 mb-3">
            <Text>
              {library.status === 'ready'
                ? 'No games to show yet.'
                : 'Recent activity is unavailable.'}
            </Text>
          </h3>
          <p className="text-muted-foreground">
            <Text>You can still explore my games on Steam.</Text>
          </p>
        </div>
      )}
    </section>
  );
}
