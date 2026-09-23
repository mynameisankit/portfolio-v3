# Architecture

Application source lives in src. A feature keeps its components, hooks and supporting logic together.

| Path                                                     | Responsibility                                                                              |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| src/app                                                  | Next.js routes, root layout, metadata and global styles. The page composes sections.        |
| src/features/hero                                        | Hero presentation, React lifecycle hook, browser controller, canvas rendering and playback. |
| src/features/projects                                    | Project cards, canvas arrangement, expansion state, DOM animation and iframe sizing.        |
| src/features/hobbies                                     | Hobby photo selection and presentation.                                                     |
| src/features/theme                                       | Theme button, React subscription and browser persistence.                                   |
| src/features/layout                                      | Site header, navigation and footer.                                                         |
| src/features/experience                                  | Experience section.                                                                         |
| src/features/contact                                     | Contact section.                                                                            |
| src/features/portfolio/content.ts                        | Editable copy and content types; Sanity is deferred.                                        |
| src/components/ui                                        | Shared shadcn Button and Tooltip.                                                           |
| src/lib/life                                             | Simulation rules and seeds shared by hero and projects.                                     |
| src/lib/utils.ts                                         | Shared class-name utility.                                                                  |
| src/demos/json-renderer                                  | React 18 demo workspace, presentation and pinned upstream source.                           |
| src/lib/chatgpt-auth.ts, src/db, src/hooks/use-mobile.ts | Retained starter integrations, unused by the portfolio.                                     |

## Data flow

The page passes content to each section. Components render UI; hooks connect React state and lifecycle to behavior; browser controllers own listeners, observers, storage or animation APIs.

Hero: PixelHero → usePixelHero → pixel-hero-controller → life-player and pixel-renderer.
The player computes generations using shared Life rules. The renderer draws the cells. Disposing the controller stops playback and removes browser listeners.

Projects: ProjectCanvas → useProjectExpansion → project-transition.
The hook owns selection and transition state; the transition module owns DOM measurement and animation. ProjectCard presents one project. JsonRendererDemo validates messages from its iframe and adjusts its height.

Theme: ThemeToggle → useTheme → theme-store.
The store owns persistence and notifications; the hook subscribes React; the button renders the current action.

Use relative imports inside a feature and @/ imports across boundaries. The @/ alias resolves to src. SRP means one reason to change; a short component can own cohesive UI state without requiring another file.

## Root-level files

Configuration, build scripts and public assets remain outside src because they serve the project or are required in those locations by tooling.

- public: static assets and generated iframe bundle; edit demo source rather than generated files.
- scripts: build, source-sync and static-server commands.
- docs: architecture notes.
- .vscode: automatic formatting and extension recommendations.
- package.json, yarn.lock, .yarnrc.yml: Yarn workspace setup and reproducible dependencies.
- .next, out, node_modules: generated artifacts.
- .openai, build, vendor, examples, drizzle and Vite configuration: retained hosting/starter infrastructure.

## Dependencies

The root workspace uses React 19. The renderer demo workspace uses React 18 because upstream expects it. Yarn uses node_modules with workspace-level hoisting boundaries to keep those runtimes separate, managed by one root lockfile.

The demo's upstream source is intentionally unmodified. Source synchronization targets a reviewed commit. Generated and vendored code is excluded from application formatting conventions.
