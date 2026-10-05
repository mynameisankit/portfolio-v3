export const ILLUSTRATION_TYPES = [
  'hierarchy',
  'components',
  'authentication',
  'imports',
  'localization',
  'schema',
  'none',
] as const;

// A company becomes active when its section reaches the upper third of the viewport.
export const CAREER_SECTION_ACTIVATION_RATIO = 0.3;
export const CAREER_STICKY_MINIMUM_INSET_PX = 32;
export const ILLUSTRATION_VIEWBOX_WIDTH = 600;
export const ILLUSTRATION_HORIZONTAL_INSET = 28;

export const CAREER_COMPANY_SECTIONS = [
  { company: 'rubrik', sectionId: 'engineering-rubrik' },
  { company: 'tekion', sectionId: 'engineering-tekion' },
] as const;
