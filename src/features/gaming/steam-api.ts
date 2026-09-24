import 'server-only';

import { parseOwnedGames } from './parse-owned-games';

const steamId = '76561198876357147';

export async function getOwnedGames(apiKey: string) {
  const url = new URL('https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/');
  url.searchParams.set(
    'input_json',
    JSON.stringify({
      steamid: steamId,
      include_appinfo: true,
      include_played_free_games: true,
    }),
  );
  const response = await fetch(url, {
    headers: { 'x-webapi-key': apiKey },
    signal: AbortSignal.timeout(10000),
    cache: 'force-cache',
  });
  if (!response.ok) {
    throw new Error('Steam library request failed');
  }
  return parseOwnedGames(await response.json());
}
