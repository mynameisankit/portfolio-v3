import { portfolio } from '@/data/portfolio/content';
import { careerField } from './career';
import { skillsField } from './skills';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const portfolioSite = defineType({
  name: 'portfolioSite',
  title: 'Portfolio',
  type: 'document',
  initialValue: {
    ...portfolio,
    skills: portfolio.skills.map((group) => ({
      ...group,
      _key: group.id,
      items: group.items.map((skill, index) => ({ ...skill, _type: 'skill', _key: String(index) })),
    })),
    career: portfolio.career.map((entry) => ({ ...entry, _key: entry.id })),
    projects: portfolio.projects.map((project) => ({ ...project, _key: project.id })),
    hobbies: portfolio.hobbies.map(({ name, caption }, index) => ({
      name,
      caption,
      _key: String(index),
    })),
  },
  fields: [
    careerField,
    skillsField,
    ...(['name', 'role', 'company', 'headline', 'subtitle'] as const).map((name) =>
      defineField({ name, type: 'string', validation: (rule) => rule.required() }),
    ),
    defineField({
      name: 'github',
      type: 'url',
      validation: (rule) => rule.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'projects',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Interactive demo',
              type: 'string',
              options: { list: ['json', 'life'] },
              validation: (rule) => rule.required(),
            }),
            ...['name', 'category', 'description'].map((name) =>
              defineField({ name, type: 'string', validation: (rule) => rule.required() }),
            ),
            defineField({
              name: 'source',
              type: 'url',
              validation: (rule) => rule.uri({ scheme: ['https'] }),
            }),
          ],
        }),
      ],
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
          ],
        }),
      ],
    }),
  ],
});
