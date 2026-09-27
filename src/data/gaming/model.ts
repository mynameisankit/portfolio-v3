export type SteamGame = {
  appid: number;
  name: string;
  playtime_forever: number;
  lastPlayed: string;
  image: string;
  fallbackImage?: string;
};
export type GameLibrary = {
  mode: 'recent' | 'most-played';
  games: SteamGame[];
  updatedAt: string | null;
  avatar: string;
  status: 'ready' | 'unavailable';
};
