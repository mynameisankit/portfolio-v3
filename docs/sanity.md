# Sanity content management

Project: yek4giks. Dataset: production.

Run yarn studio to open the editor at http://127.0.0.1:3333/studio/. Sign in with the Sanity account that owns this project. If prompted to allow that origin, add http://127.0.0.1:3333 in the project's API/CORS settings with credentials enabled.

Portfolio opens a single document prefilled with the approved copy. Review and Publish to make it the CMS source. Until that document exists, the site uses the local portfolio fallback.

Blog posts support the three categories, title, URL slug, excerpt, publication date, tags, cover image, rich text, inline images and code blocks. Required image alternative text keeps editorial images accessible. Slugs should be unique within each category; avoid changing a published slug without adding a redirect.

Only published documents whose publication date has arrived are read. Drafts never appear. With no published posts, /blogs displays the real empty state. Sample content remains at /blogs/preview-samples, and the empty design can be reviewed at /blogs/preview-empty. Preview pages are marked noindex.

Run yarn build after publishing and redeploy out. The site is a static export: publishing does not change an already deployed build. Scheduled dates likewise require a rebuild when due. No paid search or CMS features, webhooks or billing changes were configured. Usage remains subject to the existing Sanity plan.

The dataset is publicly readable, so no API token is required for build-time reads. Do not put write tokens in browser configuration. API failures or malformed published content fail the build instead of replacing content with sample posts.

Architecture: src/sanity owns configuration and schemas; each feature's repository maps CMS documents into its existing UI model. The browser receives blog data for local Fuse search, with no direct Sanity queries. Portable Text renders article bodies, and masonry reflows when cover sizes change.

## Install and edit from mobile

`yarn build` now builds both the portfolio and Sanity Studio into `out`. The editor lives at `/studio/`; `/manage` is the installable owner entry point. The public portfolio and Content Studio have separate manifest IDs, so installing from `/manage` launches the editor entry point instead of the homepage.

For local development, run `yarn dev` and `yarn studio` in separate terminals. Studio now opens at `http://127.0.0.1:3333/studio/`. Add `http://127.0.0.1:3333` as a credentialed CORS origin if needed. Production can be checked with `yarn build` then `yarn start` (stop the dev server first).

To use it on a phone:

1. Deploy `out` to an HTTPS host. Localhost on a phone points to the phone, not your computer.
2. Configure `/studio/*` to serve `/studio/index.html` with a 200 rewrite, while serving existing assets normally. The generated `_redirects` file supports hosts that recognize that format; other hosts need the equivalent configuration. Do not rewrite the whole portfolio to the Studio.
3. Add the deployed origin (scheme and hostname, no path) to the Sanity project's API/CORS settings with credentials enabled.
4. Open `https://ankitkumar.fyi/manage` on your phone. In Safari use Share → Add to Home Screen; in Android Chrome use Install app / Add to Home screen.
5. Open the editor and sign in with an authorized Sanity account. Edit and publish normally.

The shell does not grant access: Sanity authentication and project roles control editing. No write tokens are shipped. No paid features are required by this implementation.

Editing and publishing require internet access. The service worker caches only the generic offline page, never drafts, API responses, credentials, or the Studio. It uses the network for navigation, so it does not hold onto an old published portfolio. A deployed static build still needs to be rebuilt after publishing; no automatic deploy hook has been connected.

Serve `sw.js` and manifests with revalidation/no-cache. `_headers` is included for compatible hosts; configure the equivalent on other hosts. Service workers register only in production to avoid interfering with development.

Production domain: https://ankitkumar.fyi. Allow exactly this origin with credentials in Sanity. Also allow https://www.ankitkumar.fyi only if that hostname serves the editor instead of redirecting. DNS/hosting and CORS have not been changed by this implementation.
