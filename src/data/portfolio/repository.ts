import { cache } from 'react';
import { careerEntrySchema } from '@/data/experience/schema';
import { skillCategorySchema } from '@/data/skills/schema';
import { sanityClient } from '@/sanity/client';
import { portfolio, type PortfolioContent } from './content';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
  headline: z.string().min(1),
  subtitle: z.string(),
  github: z.string().url(),
  resumeUrl: z.union([z.literal(''), z.string().url()]).default(''),
  projects: z
    .array(
      z.object({
        id: z.enum(['json', 'life']),
        name: z.string(),
        category: z.string(),
        description: z.string(),
        source: z.union([z.literal(''), z.string().url()]),
      }),
    )
    .min(1),
  additionalProjects: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string(),
        image: z.string().url(),
        lqip: z.string(),
        source: z.string().url(),
      }),
    )
    .nullable()
    .optional(),
  skills: z.array(skillCategorySchema).nullable().optional(),
  career: z.array(careerEntrySchema).nullable().optional(),
  hobbies: z
    .array(
      z.object({
        name: z.string(),
        image: z.string(),
        lqip: z.string(),
        caption: z.string(),
        location: z.string().default(''),
        takenOn: z.string().default(''),
        story: z.string().default(''),
      }),
    )
    .min(1),
});

const query = `
  *[_type == "portfolioSite"] | order(_updatedAt desc)[0] {
    name,
    role,
    company,
    headline,
    subtitle,
    github,
    "resumeUrl": coalesce(resumeUrl, ""),
    projects[] {
      id,
      name,
      category,
      description,
      "source": coalesce(source, "")
    },
    additionalProjects[] {
      title,
      "description": coalesce(description, ""),
      "image": image.asset->url,
      "lqip": coalesce(image.asset->metadata.lqip, ""),
      source
    },
    skills[] {
      "id": coalesce(id, _key),
      title,
      items
    },
    career[] {
      "id": coalesce(id, _key),
      organization,
      role,
      period,
      "location": coalesce(location, ""),
      "current": coalesce(current, false),
      "summary": coalesce(summary, ""),
      "highlights": coalesce(highlights, [])
    },
    hobbies[] {
      name,
      "image": coalesce(image.asset->url, ""),
      "lqip": coalesce(image.asset->metadata.lqip, ""),
      "caption": coalesce(caption, ""),
      "location": coalesce(location, ""),
      "takenOn": coalesce(takenOn, ""),
      "story": coalesce(story, "")
    }
  }
`;

export const getPortfolio = cache(async (): Promise<PortfolioContent> => {
  const document = await sanityClient.fetch<unknown>(query);
  if (document === null) {
    return portfolio;
  }
  const parsed = schema.parse(document);

  return {
    ...parsed,
    additionalProjects: parsed.additionalProjects ?? portfolio.additionalProjects,
    career: parsed.career ?? portfolio.career,
    skills: parsed.skills ?? portfolio.skills,
  };
});
