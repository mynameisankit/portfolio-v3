# Steam games and hobbies

The public page is /hobbies with Travelling, Gaming, and Running & Hiking sections. Travel and outdoor entries are explicit placeholders. /gaming remains a compatibility route serving the same page.

## Two data branches

Without STEAM_API_KEY, the build reads up to three recent games from https://steamcommunity.com/id/bizzareKumar/ in profile order. The profile supplies the avatar used by the hover preview.

With STEAM_API_KEY, the build calls GetOwnedGames for Steam ID 76561198876357147, includes played free games, filters out unplayed titles, sorts by lifetime playtime, and shows up to 25 games. A smaller library is shown as-is. If Steam rejects the key, hides the library, returns malformed data, or times out, it falls back to public-profile activity. If both sources fail, the page retains the profile link and shows an unavailable state.

Add STEAM_API_KEY to your ignored .env.local for local builds, and to your deployment build environment for production. Do not prefix it with NEXT_PUBLIC_. The server-only repository sends it in the x-webapi-key header; the exported site contains only game data. Do not share the key in chat or commit it. Restart development or rebuild after changing the environment.

Steam data is fetched during the static build, so rebuild/redeploy to refresh activity. Profile scraping may need maintenance if Steam changes its markup. The API only exposes game details visible to the key; owning a key does not bypass profile privacy.

API reference: https://partner.steamgames.com/doc/webapi/iplayerservice
Authentication: https://partner.steamgames.com/doc/webapi_overview/auth
