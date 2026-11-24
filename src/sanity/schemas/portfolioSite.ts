import { portfolio } from '@/data/portfolio/content';
import { careerField } from './career';
import { contributionsField } from './contributions';
import { skillsField } from './skills';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const portfolioSite = defineType({
  name: 'portfolioSite',
  title: 'Portfolio',
  type: 'document',
  initialValue: {
    name: portfolio.name,
    role: portfolio.role,
    company: portfolio.company,
    headline: portfolio.headline,
    subtitle: portfolio.subtitle,
    github: portfolio.github,
    resumeUrl: portfolio.resumeUrl,
    skills: portfolio.skills.map(({ id, ...group }) => ({
      ...group,
      _key: id,
      items: group.items.map((skill, index) => ({ ...skill, _type: 'skill', _key: String(index) })),
    })),
    additionalProjects: portfolio.additionalProjects,
    career: portfolio.career.map(({ id, ...entry }) => ({ ...entry, _key: id })),
    contributions: portfolio.contributions.map(({ id, ...entry }) => ({ ...entry, _key: id })),
    hobbies: portfolio.hobbies.map(({ name, caption }, index) => ({
      name,
      caption,
      _key: String(index),
    })),
  },
  fields: [
    careerField,
    skillsField,
    contributionsField,
    ...(['name', 'role', 'company', 'headline', 'subtitle'] as const).map((name) =>
      defineField({ name, type: 'string', validation: (rule) => rule.required() }),
    ),
    defineField({
      name: 'github',
      type: 'url',
      validation: (rule) => rule.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Résumé URL',
      description: 'Link to a hosted résumé or PDF. Leave empty to hide the résumé action.',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'additionalProjects',
      title: 'Additional projects',
      description: 'Simple project cards shown after the interactive demos on the home page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
            defineField({
              name: 'description',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'source',
              title: 'Source or live URL',
              type: 'url',
              validation: (rule) => rule.required().uri({ scheme: ['https'] }),
            }),
          ],
          preview: { select: { title: 'title', media: 'image' } },
        }),
      ],
    }),
    defineField({
      name: 'hobbies',
      title: 'Hobby photos',
      description:
        'Photos for the home page hobbies card. Add multiple entries to browse them. Publish and rebuild the website to update the gallery.',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
            defineField({
              name: 'caption',
              title: 'Photo description',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({ name: 'location', title: 'Place', type: 'string' }),
            defineField({ name: 'takenOn', title: 'Date taken', type: 'date' }),
            defineField({
              name: 'story',
              title: 'Photo story',
              description:
                'A short personal note displayed below the photo. The photo description remains the image’s accessible text.',
              type: 'text',
              rows: 3,
            }),
          ],
        }),
      ],
    }),
  ],
});
