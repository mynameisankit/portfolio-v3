import 'server-only';

export const serverConfig = {
  steamApiKey: process.env.STEAM_API_KEY?.trim(),
};
