import 'server-only';
import { steamConfig } from '@/config/steamConfig';
import { parseOwnedGames } from './parseOwnedGames';

export async function getOwnedGames(apiKey: string) {
  const url = new URL('https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/');
  url.searchParams.set(
    'input_json',
    JSON.stringify({
      steamid: steamConfig.steamId,
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
