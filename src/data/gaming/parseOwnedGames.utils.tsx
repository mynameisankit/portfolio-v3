import { steamConfig } from '@/config/steamConfig';
import type { SteamGame } from './model';
import { z } from 'zod';

const ownedGamesSchema = z.object({
  response: z.object({
    game_count: z.number().int().nonnegative(),
    games: z
      .array(
        z.object({
          appid: z.number().int().positive(),
          name: z.string().min(1),
          img_icon_url: z
            .string()
            .regex(/^[a-f0-9]*$/i)
            .optional(),
          playtime_forever: z.number().nonnegative(),
        }),
      )
      .optional(),
  }),
});

export function parseOwnedGames(value: unknown): SteamGame[] {
  const { response } = ownedGamesSchema.parse(value);
  if (response.game_count > 0 && !response.games?.length) {
    throw new Error('Steam library is unavailable');
  }

  return (response.games ?? [])
    .filter((game) => game.playtime_forever > 0)
    .sort((a, b) => b.playtime_forever - a.playtime_forever || a.appid - b.appid)
    .slice(0, steamConfig.maxGames)
    .map((game) => {
      const iconUrl = `https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;

      return {
        ...game,
        lastPlayed: '',
        fallbackImage: game.img_icon_url ? iconUrl : '',
        image: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`,
      };
    });
}
