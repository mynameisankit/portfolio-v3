# Ankit Kumar Portfolio

Portfolio for ankitkumar.fyi, built with Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, and Sanity. The website is statically exported; content changes require a rebuild and redeployment, either manually or through a Cloudflare Workers Build deploy hook.

## Getting started

Use Node.js 22.13 or newer with Corepack available. Yarn 4.9.2 is pinned in package.json.

```sh
corepack enable
yarn install
yarn dev
```

Run `yarn studio` in a second terminal to edit CMS content. Studio opens at <http://127.0.0.1:3333/studio/>.

Scripts use your installed Node.js runtime. If a development server is already running, use its printed URL or stop it before starting another instance.

## Commands

| Command                             | Purpose                                                                     |
| ----------------------------------- | --------------------------------------------------------------------------- |
| `yarn dev`                          | Generate PWA assets and start Next.js.                                      |
| `yarn studio`                       | Start the local Sanity editor.                                              |
| `yarn build`                        | Generate PWA assets, export the site, and package Studio into `out/studio`. |
| `yarn start`                        | Preview `out` with `serve`, using `serve.json` for Studio routing.          |
| `yarn lint` / `yarn lint:fix`       | Check or fix ESLint findings.                                               |
| `yarn format` / `yarn format:check` | Format or check maintained source.                                          |
| `yarn install --immutable`          | Install locked dependencies in CI.                                          |

Run lint, formatting checks, and a production build before publishing. There is no automated test suite; browser interaction checks supplement these commands.

## Project structure

| Path                          | Responsibility                                                |
| ----------------------------- | ------------------------------------------------------------- |
| `src/app`                     | Routes, layouts, metadata, and global styling.                |
| `src/app/_components`         | Home sections and shared presentation components.             |
| `src/app/blogs/_components`   | Blog archive, article rendering, search, and masonry hooks.   |
| `src/app/hobbies/_components` | Hobbies presentation and gaming cards.                        |
| `src/data`                    | Repositories, validation, models, and fallback content.       |
| `src/localization`            | Translation JSON, catalog, locale models, and CMS overrides.  |
| `src/config`                  | Central integration configuration.                            |
| `src/sanity`                  | CMS client and Studio schemas.                                |
| `src/pwa/assets`              | Service worker, offline page, and PWA source assets.          |
| `src/lib`                     | Shared utilities and Game of Life simulation rules.           |
| `public`                      | Branding assets and generated PWA files.                      |
| `scripts`                     | PWA generation, Studio packaging, and custom ESLint rules.    |
| `.vscode`                     | Shared editor formatting settings and recommended extensions. |
| `.openai`                     | Existing hosting identity and static output configuration.    |

Components, hooks, and presentation helpers are colocated in the owning route's `_components` folder. These private folders create no URLs. Shared components live at the nearest common layout. Use relative imports within a module and `@/` imports across modules; the alias resolves to `src`.

`node_modules`, `.yarn`, `.next`, `.sanity`, `studio-dist`, and `out` are dependency state or generated output. `.sites-runtime` contains ignored local verification artifacts. Deploy `out`; do not edit generated files.

## Sanity and publishing

The configured project is `yek4giks`, dataset `production`. Integration settings live in `src/config/sanityConfig.ts`.

1. Run `yarn studio` and sign in with an authorized Sanity account.
2. If needed, add `http://127.0.0.1:3333` to the project's API/CORS origins with credentials enabled.
3. Open the Portfolio document, review its initial content, and publish it. Until a published document exists, the site uses `src/data/portfolio/content.ts` and its related fallback content.
4. Publish blog posts or translations as needed.
5. Run `yarn build`, preview with `yarn start`, and deploy `out`.

The dataset is publicly readable, so build-time reads need no API token. Never put write tokens in browser configuration. Failed CMS requests or invalid published data fail the build rather than silently substituting sample blog posts.

Blogs support technical, travelling, and video-games categories. Supply a title, category, unique slug within that category, publication date, and content; images require alternative text. Only published posts whose publication date has arrived appear. Scheduled posts still require a rebuild when due. Avoid changing published slugs without adding redirects.

With no published posts, `/blogs` shows the empty state. `/blogs/preview-samples` provides layout fixtures and `/blogs/preview-empty` previews the empty design; both are marked noindex. Blog data is exported for local Fuse search, with no browser-side Sanity query.

### Open source contributions

The homepage shows curated contributions from the Portfolio document's **Open source contributions** list, with bundled defaults in `src/data/contributions/content.ts`. Each entry includes a repository, issue or PR number, title, summary, GitHub URL, and `kind` (`issue` or `pullRequest`). Pull requests use their own label and icon in the same card layout. Add or reorder entries in Studio, publish, then rebuild. Missing CMS content uses the defaults; an empty list hides the section. GitHub status is not fetched at runtime.

### Automatic CMS deployments

Sanity stores the content, but this application renders that content during `yarn build`. A Sanity webhook must therefore trigger a new Cloudflare Workers Build; sending it to `https://ankitkumar.fyi` cannot update an already-deployed static site.

1. In Cloudflare, connect this repository to the `ankit-portfolio` Worker through Workers Builds. Use the build settings in the next section and select the production branch.
2. Go to **Workers & Pages → ankit-portfolio → Settings → Builds → Deploy Hooks**. Create a hook named `sanity-production` for the production branch and copy its generated URL.
3. In Sanity project `yek4giks`, edit the webhook with the following values:

   | Field          | Value                                                   |
   | -------------- | ------------------------------------------------------- |
   | URL            | The Cloudflare Deploy Hook URL from step 2              |
   | HTTP method    | `POST`                                                  |
   | Dataset        | `production`                                            |
   | Trigger events | Create, Update, Delete                                  |
   | Filter         | `_type in ["portfolioSite", "blogPost", "translation"]` |
   | Include drafts | Disabled                                                |

4. Publish one change in Sanity. Its delivery log should receive a 2xx response, and Cloudflare's Builds page should show a new production build with `deploy hook` as the trigger. Once the build succeeds, reload the portfolio normally.

The deploy-hook URL is a credential: do not commit it, publish it, or send it in chat. If it leaks, delete it in Cloudflare and create a replacement.

See [Cloudflare Workers Deploy Hooks](https://developers.cloudflare.com/workers/ci-cd/builds/deploy-hooks/) and [Sanity webhooks](https://www.sanity.io/docs/content-lake/webhooks) for dashboard details.

## Cloudflare Workers deployment

Wrangler deploys the static export in `out`; no Worker application script is needed. The Worker name in `wrangler.jsonc` is `ankit-portfolio`. Use that name in Cloudflare, or change the configuration to match your existing Worker.

Connect the GitHub repository in Workers Builds and use:

| Field           | Value                   |
| --------------- | ----------------------- |
| Build command   | `yarn build`            |
| Deploy command  | `yarn wrangler deploy`  |
| Preview command | `yarn wrangler preview` |
| Root directory  | Repository root         |

Set build variables `NODE_VERSION=24.19.0` and `YARN_VERSION=4.9.2`. Add `STEAM_API_KEY` as a secret in the build environment if you want most-played games. Sanity's public configuration is already in source; no read token is required.

After deployment, add `ankitkumar.fyi` under the Worker's Settings → Domains & Routes → Add → Custom Domain. Configure Sanity CORS and EmailJS as described below. The build includes `_redirects` for Studio and `_headers` for the PWA. Studio assets are packaged in `out/studioAssets`, outside the `/studio/*` page fallback. The packaged HTML links directly to `/studioAssets/`; asset requests must not depend on the `/studio/*` rewrite.

For local Cloudflare verification, run `yarn build`, then `yarn wrangler dev`. This is distinct from `yarn wrangler preview`, which publishes a remote preview. `yarn wrangler deploy --dry-run` validates deployment configuration without publishing. Manual deployment requires `yarn wrangler login` first.

See [Workers static assets](https://developers.cloudflare.com/workers/static-assets/get-started/) and [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/).

## Mobile editor and PWA deployment

The public portfolio and editor have separate manifest IDs. `/manage` is the installable editor entry point; `/studio/` contains Sanity Studio.

1. Deploy `out` to an HTTPS host.
2. Configure `/studio/*` to fall back to `/studio/index.html` with a 200 rewrite, serving existing assets normally. The generated `_redirects` supports compatible hosts; configure an equivalent rule elsewhere. Do not rewrite the entire portfolio to Studio.
3. Add `https://ankitkumar.fyi` to Sanity API/CORS origins with credentials enabled. Add the `www` origin only if it also serves the editor rather than redirecting.
4. Serve `sw.js` and manifests with revalidation/no-cache. Generated `_headers` provides this for compatible hosts.
5. On your phone, open <https://ankitkumar.fyi/manage>. Use Safari's Share → Add to Home Screen or Chrome's Install app / Add to Home screen.
6. Sign in, edit, and publish. Rebuild and redeploy to update the public site.

Editing requires internet access and an authorized Sanity account. The service worker registers only in production and caches the generic offline page, not Studio, drafts, API responses, or credentials. DNS, hosting, and CORS must be configured in their respective services.

## Steam and hobbies

`/hobbies` contains Travelling, Gaming, and Running & Hiking. Travel and outdoor content currently use placeholders; `/gaming` remains a compatibility route.

Without a key, the build reads up to three recent games from [the public Steam profile](https://steamcommunity.com/id/bizzareKumar/) in profile order.

To display up to nine most-played games, add this to the ignored `.env.local` and your deployment's build environment:

```dotenv
STEAM_API_KEY=your_steam_api_key
```

Do not use a `NEXT_PUBLIC_` prefix. The server-only integration sends the key in the `x-webapi-key` header; exported pages contain game data only. Restart development or rebuild after changing it.

The API uses Steam ID `76561198876357147`, includes played free games, excludes unplayed titles, and sorts by lifetime playtime. Failed or private-library responses fall back to public-profile activity. If both sources fail, the page keeps the profile link and shows an unavailable state. A key does not bypass Steam privacy settings.

Rebuild and redeploy to refresh activity. Public-profile parsing may need maintenance if Steam changes its markup. See the [Steam player API](https://partner.steamgames.com/doc/webapi/iplayerservice) and [authentication reference](https://partner.steamgames.com/doc/webapi_overview/auth).

## Translations

All bundled translations live in `src/localization/translations.json`, as an array of entries:

```json
{
  "en": "Experience",
  "nl": "Ervaring",
  "de": "Erfahrung",
  "sv": "Erfarenhet",
  "ja": "職歴"
}
```

Keep `en` identical to the authored English text and edit the other language fields. Rebuild after editing.

For CMS overrides:

1. Publish the English content.
2. In Studio's Translations section, add the exact English source, target language, and translation.
3. Publish, rebuild, and redeploy.

Published Sanity translations override JSON entries. Matching normalizes whitespace but otherwise requires the same source text. Avoid duplicate source/language entries. Changed or untranslated text falls back to English; update CMS overrides if JSON changes appear ineffective. Rich-text translations match individual spans while preserving formatting and links; code remains unchanged.

English, Dutch, German, Swedish, and Japanese are supported. Language selection persists locally and can be shared using `?lang=nl` (or `en`, `de`, `sv`, `ja`). Internal links preserve it. Switching occurs after hydration; exported HTML and search metadata remain English. Translations are maintained manually; no automatic translation service is connected.

## Contact form

Public EmailJS identifiers live in `src/config/emailConfig.ts`. Name and message are required; reply email is optional. The template controls the fixed recipient.

1. Confirm service `service_y2ijfaj` is connected and template `template_h881z8n` is enabled with your recipient address.
2. Allow `https://ankitkumar.fyi` in EmailJS account settings where applicable.
3. Match template variables: `firstName`, `lastName`, `subject`, `eMail`, and `message`. The form also supplies `name`, `from_name`, `email`, and `reply_to`. `firstName` contains the full name; `lastName` is empty.
4. Optionally configure Reply-To with `reply_to`, which may be empty.
5. Send a deliberate message to verify actual inbox delivery; prior browser checks mocked requests without sending mail.

The form prevents repeated pending submissions and uses a 30-second SDK throttle. These client controls are not server-side abuse protection. Delivery remains subject to your EmailJS quota. Keep private keys out of client code.

## Demos and code conventions

Project components are under `src/app/_components/projects`, with separate `jsonRenderer` and `gameOfLife` folders. The JSON demo uses the published `@mynameisankit/react-json-renderer` package, pinned to 1.2.0, directly with React 19. Portfolio CSS variables control its theme, and ResizeObserver supplies its width. The Game of Life card is a preview; its separate rewrite is not complete.

ESLint and Prettier enforce:

- PascalCase component filenames and camelCase hooks, helpers, and source folders, with Next.js route conventions preserved.
- Separate files for components, hooks, and top-level helpers.
- `const` bindings; no `let` or `var`.
- Sorted imports in a continuous block, followed by one blank line.
- Boolean prefixes such as `is`, `has`, `should`, and `can`, with external API naming exceptions.
- Simple ternary branches: literals, references, or simple calls with simple arguments. Move complex expressions into explicit branches or focused helpers.
- Tailwind utilities in JSX; no `@apply` or component selectors in imported CSS. Global CSS contains theme tokens and base/accessibility styles.

Use `<Text>Experience</Text>` for literal translated text and expression braces for dynamic values. In VS Code or Cursor, install the recommended ESLint and Prettier extensions; workspace settings format and fix code on explicit save.
