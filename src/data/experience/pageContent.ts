import { type EngineeringWork, engineeringWork, platformApproach } from './engineeringContent';

export const tekionWork: readonly EngineeringWork[] = [
  {
    id: 'tekion-localization',
    title: ['Local formats.', 'A shared platform.'],
    category: 'Tekion · Localization libraries',
    paragraphs: [
      'I designed shared frontend components and APIs for currencies, dates, units, and addresses across accounting, payroll, sales, and other product workflows.',
      'My ownership covered API design, packaging, and releases for localization libraries supporting the US, Canada, UK, France, and Australia. Product teams could use shared regional behavior rather than build a separate implementation for each feature.',
      'The work made localization a reusable platform capability, with common APIs that could serve different workflows and markets.',
    ],
    illustration: 'localization',
    caption:
      'Shared formatting APIs adapt currency, date, unit, and address behavior for different markets.',
  },
  {
    id: 'tekion-api-platform',
    title: ['Backend schemas.', 'Usable API experiences.'],
    category: 'Tekion · Frontend platform work',
    paragraphs: [
      'I built schema-driven API documentation and interactive request-and-response experiences, connecting backend definitions to the frontend tools developers used to explore APIs.',
      'I moved documentation rendering to React Server Components with Suspense, reducing client-side data fetching and rendering work. The focus was both the generated experience and the architecture delivering it.',
    ],
    illustration: 'schema',
    caption:
      'Backend schemas feed documentation and interactive API views, with rendering moved toward the server.',
  },
];

export const experiencePageContent = {
  title: ['Frontend engineering.', 'From design to delivery.'] as [string, string],
  intro: [
    'I’m a software engineer at Rubrik, working on Rubrik Security Cloud. My work spans product features, shared UI architecture, and the tools and conventions other engineers build with.',
    'I take features from design through release, build reusable components and workflows, and lead changes across existing code. These examples show what I owned, the engineering decisions behind it, and their impact.',
  ],
  selectedWorkHeading: 'Engineering at Rubrik',
  works: engineeringWork,
  tekionHeading: 'Engineering at Tekion',
  tekionWorks: tekionWork,
  designHeading: 'Design decisions',
  designTitle: ['Simplify the platform.', 'Carry the change through.'] as [string, string],
  designParagraphs: platformApproach,
  alongsideHeading: 'Alongside the feature work',
  alongsideParagraphs: [
    'As a certified UI code reviewer, I review changes daily across the UI organization. I also interview frontend candidates, author interview questions, and run knowledge-sharing sessions.',
    'React and TypeScript are my core tools. I also work with GraphQL, forms, automated tests, shared UI components, and AWS and Azure backup workflows.',
  ],
  careerHeading: 'Career journey',
};
