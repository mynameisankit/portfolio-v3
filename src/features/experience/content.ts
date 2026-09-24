import type { CareerEntry } from './model';

export const career: CareerEntry[] = [
  {
    id: 'rubrik',
    organization: 'Rubrik',
    role: 'Software Engineer',
    period: 'Nov 2024 — Present',
    location: 'Bengaluru, India',
    current: true,
    summary:
      'Own frontend architecture and delivery for Cloud Workloads. Took a new cloud data protection capability from design to general availability in about four months as the sole frontend engineer.',
    highlights: [
      'Built a five-level cloud inventory picker with dependent GraphQL queries, URL-persisted selections, and virtualized lists for hundreds of resources.',
      'Shipped multi-step protection and configuration workflows with validation, permissions, asynchronous states, and error recovery.',
      'Built a reusable paginated hierarchy table, introduced TypeScript subpath imports, and contributed to the shared Aura UI component library.',
      'Migrated Redux Form to Formik, Moment.js to Temporal, and class components to hooks; replaced legacy dependencies with native equivalents.',
      'Created reusable Augment AI and Claude Code skills for package scaffolding and recurring frontend migrations.',
      'Conducted frontend interviews covering component design, fundamentals, and practical problem solving.',
    ],
  },
  {
    id: 'tekion',
    organization: 'Tekion Corp.',
    role: 'Associate Software Engineer',
    period: 'Jan 2023 — Oct 2024',
    location: 'Bengaluru, India',
    current: false,
    summary:
      'Built shared frontend libraries and developer tools, with a focus on internationalization and schema-driven API experiences.',
    highlights: [
      'Designed shared components and APIs for currencies, dates, units, and addresses across accounting, payroll, sales, and other dealership workflows.',
      'Owned API design, packaging, and releases for localization libraries supporting the US, Canada, UK, France, and Australia.',
      'Generated API documentation and interactive request/response experiences from backend schemas.',
      'Moved API documentation rendering to React Server Components with Suspense, reducing client-side data fetching and rendering work.',
    ],
  },
  {
    id: 'iiit-guwahati',
    organization: 'IIIT Guwahati',
    role: 'B.Tech, Computer Science',
    period: '2019 — 2023',
    location: 'Guwahati, Assam',
    current: false,
    summary:
      'Bachelor of Technology in Computer Science at the Indian Institute of Information Technology, Guwahati.',
    highlights: [],
  },
];
