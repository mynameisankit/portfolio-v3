# Ankit Kumar portfolio

Next.js, React, TypeScript, Tailwind and shadcn/ui. Source is under src and colocated by feature. See [the architecture guide](docs/architecture.md) for responsibilities and data flow.

## Development

Use Node.js 22.13 or newer with Corepack available.

1. Run corepack enable if Yarn is not already available.
2. Run yarn install at the project root. This also installs the isolated JSON demo workspace.
3. Run yarn dev.

Yarn 4.9.2 is pinned in package.json. CI uses yarn install --immutable.

## Commands

- yarn dev: build the embedded demo and start Next.js.
- yarn build: build the demo and export the portfolio into out.
- yarn start: serve the static export.
- yarn lint / yarn lint:fix: check or fix ESLint findings.
- yarn format / yarn format:check: format or check maintained source.
- yarn demo:sync <full-40-character-commit-sha>: fetch a reviewed upstream renderer snapshot.
- yarn demo:build: rebuild the embedded renderer.

The dev and build scripts explicitly build the demo; they do not depend on npm lifecycle hooks.

## Content and demos

Edit src/features/portfolio/content.ts for portfolio copy. Hobby photos use placeholders. Sanity project yek4giks, dataset production, supplies published content. Run yarn studio to edit it; see [CMS setup](docs/sanity.md). Rebuild the static site after publishing.

The Life project card is a preview; its separate rewrite is not complete.

The JSON demo uses the real upstream useJsonLines hook. Its npm release lacks usable entrypoint metadata and bundles React, so the portfolio builds a pinned source snapshot in an isolated React 18 iframe. Provenance is in src/demos/json-renderer/source.json. The main application uses React 19. Review and commit snapshot and lockfile changes together after source synchronization.

## Conventions

ESLint combines Next.js and TypeScript checks with Airbnb-inspired rules, sorted imports and Prettier. Maintained code uses const; let and var are rejected. Vendored upstream code keeps its original conventions.

In VS Code or Cursor, install the workspace-recommended ESLint and Prettier extensions. The workspace enables formatting and ESLint fixes on explicit save.

No automated test suite, per request. Validation uses lint, formatting, production builds and browser interaction checks.

### Windows Node runtime

This project includes an optional, pinned Windows x64 Node 24 runtime. Yarn scripts explicitly launch Node so they use the project runtime even when Yarn itself was started by an older system Node. Your global Node installation is unchanged. Other operating systems should use Node 22.13 or newer.

If yarn dev reports that another Next.js server is already running, use its printed URL or stop that server before starting a new instance.

Blog source lives in src/features/blog. /blogs reads published Sanity posts; /blogs/preview-samples contains layout fixtures, and /blogs/preview-empty shows the empty state.

See [gaming data](docs/gaming.md), [localization](docs/localization.md), and [contact setup](docs/contact.md) for the new features and their publishing requirements.
