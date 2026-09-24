import 'server-only';

import { cache } from 'react';

import { type GameLibrary, steamProfile } from './model';
import { parseSteamProfile } from './parse-steam-profile';
import { getOwnedGames } from './steam-api';

async function getProfileLibrary(): Promise<GameLibrary> {
  try {
    const response = await fetch(`${steamProfile}?l=english`, {
      signal: AbortSignal.timeout(10000),
      cache: 'force-cache',
    });
    if (!response.ok) {
      throw new Error('Steam profile unavailable');
    }
    return parseSteamProfile(await response.text());
  } catch {
    console.warn('Steam profile unavailable during this build.');
    return { games: [], avatar: '', updatedAt: null, status: 'unavailable', mode: 'recent' };
  }
}

export const getGameLibrary = cache(async (): Promise<GameLibrary> => {
  const profile = await getProfileLibrary();
  const apiKey = process.env.STEAM_API_KEY?.trim();
  if (!apiKey) {
    return profile;
  }
  try {
    const games = await getOwnedGames(apiKey);
    return {
      games,
      avatar: profile.avatar,
      updatedAt: new Date().toISOString(),
      status: 'ready',
      mode: 'most-played',
    };
  } catch {
    console.warn('Steam library unavailable; showing public profile activity instead.');
    return profile;
  }
});
