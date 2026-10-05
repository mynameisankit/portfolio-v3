import { steamConfig } from '@/config/steamConfig';
import type { GameLibrary } from './model';
import { load } from 'cheerio';

function steamImage(value: string | undefined) {
  if (!value) {
    return '';
  }
  try {
    const url = new URL(value);

    if (url.protocol === 'https:' && url.hostname.endsWith('.steamstatic.com')) {
      return url.href;
    }

    return '';
  } catch {
    return '';
  }
}

export function parseSteamProfile(html: string): GameLibrary {
  const $ = load(html);
  if (
    !$('.profile_page').length &&
    !$('meta[property="og:title"]').attr('content')?.includes('bizzareKumar')
  ) {
    return { games: [], avatar: '', updatedAt: null, status: 'unavailable', mode: 'recent' };
  }
  const games = $('.recent_game')
    .toArray()
    .flatMap((element) => {
      const card = $(element);
      const name = card.find('.game_name a').text().trim();
      const appid = Number(
        card
          .find('.game_name a')
          .attr('href')
          ?.match(/\/app\/(\d+)/)?.[1],
      );
      const details = card.find('.game_info_details').text().replace(/\s+/g, ' ').trim();
      const hours = details.match(/([\d,.]+)\s+hrs? on record/);
      if (!appid || !name || !hours) {
        return [];
      }

      return [
        {
          appid,
          name,
          playtime_forever: Math.round(Number(hours[1].replaceAll(',', '')) * 60),
          lastPlayed: details.replace(/^.*?hrs? on record\s*/, ''),
          image: steamImage(card.find('.game_capsule').attr('src')),
        },
      ];
    });

  return {
    games: games.slice(0, steamConfig.recentGames),
    mode: 'recent',
    avatar: steamImage($('meta[property="og:image"]').attr('content')),
    updatedAt: new Date().toISOString(),
    status: 'ready',
  };
}
