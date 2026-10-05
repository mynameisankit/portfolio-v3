import type { ILLUSTRATION_TYPES } from '@/config/experienceConfig';

export type EngineeringWork = {
  id: string;
  title: readonly [string, string];
  category: string;
  paragraphs: readonly string[];
  illustration: (typeof ILLUSTRATION_TYPES)[number];
  illustrationUrl?: string;
  staticIllustrationUrl?: string;
  caption: string;
};

export const engineeringWork: readonly EngineeringWork[] = [
  {
    id: 'hierarchical-tables',
    title: ['A hierarchy to explore.', 'Selection that carries across pages.'],
    category: 'AWS bulk account setup · UI engineering',
    paragraphs: [
      'I built a hierarchical, paginated table for discovering and connecting AWS accounts in bulk. Users could drill into account groups, navigate asynchronously loaded pages, and select hundreds of accounts without being limited to the rows currently on screen.',
      'The challenge was keeping the interaction correct as the visible data changed. I implemented “Select All Across Pages” and coordinated asynchronously loaded organization settings with form state. I also refactored the legacy setup flow into modular patterns.',
      'The result replaced one-at-a-time account setup with a bulk workflow. It brought together hierarchical navigation, cross-page selection, asynchronous data handling, and form-state coordination in one UI.',
    ],
    illustration: 'hierarchy',
    caption: 'Pages change. Selection stays intact across the hierarchy.',
  },
  {
    id: 'component-library',
    title: ['Clearer components.', 'Consistent across the codebase.'],
    category: 'Component library modernization',
    paragraphs: [
      'I investigated and removed obscure TypeScript patterns from our component library, replacing implicit behavior and difficult-to-extend types with clearer component contracts. I carried those changes through existing usages across the codebase using codemods and reusable AI skills.',
      'The work made shared components easier to understand and extend while preserving type safety. Automated migrations brought existing code along, and lint rules made the new conventions consistent rather than optional.',
    ],
    illustration: 'components',
    caption: 'A clearer contract, migrated across usages and reinforced by automated checks.',
  },
  {
    id: 'subpath-imports',
    title: ['Stable imports.', 'Across the whole toolchain.'],
    category: 'TypeScript subpath imports',
    paragraphs: [
      'I authored an approved RFC to replace deep relative imports with package-root TypeScript subpath imports. The change gives files a stable reference within their package instead of making developers—or AI agents—count directory levels.',
      'The migration design spans package.json imports, Jest resolution, Bazel package generation, code generators, and package scaffolding. I built proofs of concept for the codemod, lint rule, and toolchain changes, with a staged rollout designed to check development, production builds, Bazel, and Jest together.',
      'Stable package-root paths give AI agents fewer opportunities to miscount directory levels. The approach is designed to reduce incorrect imports and repeated type-check and lint attempts, improving the accuracy of generated code while reducing wasted tokens and their cost.',
    ],
    illustration: 'imports',
    caption:
      'A package-root import convention carried through resolution, build tooling, and generated code.',
  },
  {
    id: 'authentication-workflows',
    title: ['Complex authentication.', 'Reusable workflows.'],
    category: 'Authentication and feature ownership',
    paragraphs: [
      'I co-led a product integration and owned its UI from design through release, including complex OAuth authentication within multi-step workflows. I extracted duplicated authentication logic into shared hooks and packages so other features could reuse the same implementation.',
      'My ownership included the design document, coordination across teams, and stability through beta and launch. The integration reached general availability and left reusable authentication and setup workflows for the wider codebase.',
    ],
    illustration: 'authentication',
    caption:
      'Shared authentication logic supports multiple setup workflows without duplicated implementations.',
  },
];

export const platformApproach = [
  'My platform work starts with understanding how a change will affect the whole codebase: the developers using it, the environments it runs in, and the existing code that must move with it. I write RFCs that connect the design decision to its trade-offs and rollout, then take approved proposals through implementation.',
  'I use evidence to choose the approach. That can mean tracing whether a dependency still does useful work, checking where a browser API is available, or benchmarking competing lint checks. Removing a library is only useful if its replacement preserves the behavior the application needs. A new check also needs to justify the cost it adds to everyday development.',
  'The migration is part of the engineering. I build shared helpers, update existing uses, and use automated scripts where the change is mechanical. Type checks and lint rules make the new conventions enforceable, so teams can follow them without relying on a document or remembering every exception.',
  'Across the shipped work, this approach removed unnecessary dependencies, standardized common utilities, and made shared component behavior explicit. My contribution spans the proposal, implementation, migration, and checks that keep the change in place.',
];
