import { ILLUSTRATION_TYPES } from '@/config/experienceConfig';
import type { EngineeringWork } from '@/data/experience/engineeringContent';
import { experiencePageContent } from '@/data/experience/pageContent';
import { defineArrayMember, defineField } from 'sanity';

const paragraphMember = defineArrayMember({
  type: 'text',
  rows: 4,
  validation: (rule) => rule.required().min(1),
});
const initialWork = (work: EngineeringWork) => ({
  _type: 'experienceWork',
  _key: work.id,
  id: work.id,
  titleLine1: work.title[0],
  titleLine2: work.title[1],
  category: work.category,
  paragraphs: [...work.paragraphs],
  illustration: work.illustration,
  caption: work.caption,
});

const workMember = defineArrayMember({
  type: 'object',
  name: 'experienceWork',
  title: 'Engineering contribution',
  fields: [
    defineField({
      name: 'id',
      title: 'Section ID',
      type: 'string',
      description: 'Unique lowercase ID using letters, numbers, and hyphens.',
      validation: (rule) => rule.required().regex(/^[a-z0-9-]+$/),
    }),
    defineField({
      name: 'titleLine1',
      title: 'Headline — first line',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'titleLine2', title: 'Headline — second line', type: 'string' }),
    defineField({ name: 'category', type: 'string' }),
    defineField({
      name: 'paragraphs',
      type: 'array',
      of: [paragraphMember],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'illustration',
      title: 'Built-in illustration',
      type: 'string',
      initialValue: 'none',
      options: { list: ILLUSTRATION_TYPES.map((value) => ({ title: value, value })) },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'illustrationAsset',
      title: 'Custom SVG illustration',
      type: 'image',
      options: { accept: 'image/svg+xml' },
      description:
        'Optional standalone SVG with embedded CSS animation. Replaces the built-in illustration; SVG markup is never injected into the page.',
    }),
    defineField({
      name: 'staticIllustrationAsset',
      title: 'Reduced-motion illustration',
      type: 'image',
      options: { accept: 'image/svg+xml,image/png,image/jpeg,image/webp' },
      description:
        'Optional static version for reduced motion. If omitted, the selected built-in illustration is shown without animation.',
    }),
    defineField({ name: 'caption', title: 'Static explanatory caption', type: 'text', rows: 2 }),
  ],
  preview: { select: { title: 'titleLine1', subtitle: 'category', media: 'illustrationAsset' } },
});

const { title, designTitle, ...pageFields } = experiencePageContent;

export const experiencePageInitialValue = {
  _type: 'experiencePage',
  ...pageFields,
  titleLine1: title[0],
  titleLine2: title[1],
  designTitleLine1: designTitle[0],
  designTitleLine2: designTitle[1],
  works: experiencePageContent.works.map(initialWork),
  tekionWorks: experiencePageContent.tekionWorks.map(initialWork),
};

export const experiencePageField = defineField({
  name: 'experiencePage',
  title: 'Experience page',
  type: 'object',
  description:
    'Edit the experience page copy, contribution order, and illustration selection. Publish and rebuild/redeploy the static website to apply changes.',
  initialValue: experiencePageInitialValue,
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'titleLine1',
      title: 'Page headline — first line',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'titleLine2', title: 'Page headline — second line', type: 'string' }),
    defineField({ name: 'intro', type: 'array', of: [paragraphMember] }),
    defineField({ name: 'selectedWorkHeading', title: 'Rubrik section heading', type: 'string' }),
    defineField({ name: 'works', title: 'Rubrik contributions', type: 'array', of: [workMember] }),
    defineField({ name: 'tekionHeading', title: 'Tekion section heading', type: 'string' }),
    defineField({
      name: 'tekionWorks',
      title: 'Tekion contributions',
      type: 'array',
      of: [workMember],
    }),
    defineField({ name: 'designHeading', title: 'Design section label', type: 'string' }),
    defineField({
      name: 'designTitleLine1',
      title: 'Design headline — first line',
      type: 'string',
    }),
    defineField({
      name: 'designTitleLine2',
      title: 'Design headline — second line',
      type: 'string',
    }),
    defineField({
      name: 'designParagraphs',
      title: 'Design narrative',
      type: 'array',
      of: [paragraphMember],
    }),
    defineField({ name: 'alongsideHeading', title: 'Additional work heading', type: 'string' }),
    defineField({
      name: 'alongsideParagraphs',
      title: 'Additional work narrative',
      type: 'array',
      of: [paragraphMember],
    }),
    defineField({ name: 'careerHeading', title: 'Career journey heading', type: 'string' }),
  ],
});
