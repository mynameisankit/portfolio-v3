import { ILLUSTRATION_TYPES } from '@/config/experienceConfig';
import { experiencePageContent } from './pageContent';
import { z } from 'zod';

const assetUrlSchema = z.union([z.literal(''), z.string().url()]).default('');
const titleSchema = z.tuple([z.string().min(1), z.string()]);
const workSchema = z.object({
  id: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/),
  title: titleSchema,
  category: z.string(),
  paragraphs: z.array(z.string().min(1)).min(1),
  illustration: z.enum(ILLUSTRATION_TYPES).default('none'),
  illustrationUrl: assetUrlSchema,
  staticIllustrationUrl: assetUrlSchema,
  caption: z.string().default(''),
});

export const experiencePageSchema = z.object({
  title: titleSchema.default(experiencePageContent.title),
  intro: z.array(z.string()).default(experiencePageContent.intro),
  selectedWorkHeading: z.string().default(experiencePageContent.selectedWorkHeading),
  works: z.array(workSchema).default(
    experiencePageContent.works.map((work) => ({
      ...work,
      title: [...work.title] as [string, string],
      paragraphs: [...work.paragraphs],
      illustrationUrl: '',
      staticIllustrationUrl: '',
    })),
  ),
  tekionHeading: z.string().default(experiencePageContent.tekionHeading),
  tekionWorks: z.array(workSchema).default(
    experiencePageContent.tekionWorks.map((work) => ({
      ...work,
      title: [...work.title] as [string, string],
      paragraphs: [...work.paragraphs],
      illustrationUrl: '',
      staticIllustrationUrl: '',
    })),
  ),
  designHeading: z.string().default(experiencePageContent.designHeading),
  designTitle: titleSchema.default(experiencePageContent.designTitle),
  designParagraphs: z.array(z.string()).default(experiencePageContent.designParagraphs),
  alongsideHeading: z.string().default(experiencePageContent.alongsideHeading),
  alongsideParagraphs: z.array(z.string()).default(experiencePageContent.alongsideParagraphs),
  careerHeading: z.string().default(experiencePageContent.careerHeading),
});

export type ExperiencePageContent = z.infer<typeof experiencePageSchema>;
