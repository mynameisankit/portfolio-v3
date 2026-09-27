import { categories } from '@/data/blog/model';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) =>
        rule
          .required()
          .custom(
            (value) =>
              !value?.current ||
              /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current) ||
              'Use lowercase words separated by hyphens.',
          ),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: categories.map(({ slug, label }) => ({ title: label, value: slug })) },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'cover',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'body',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Subheading', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
        }),
        defineArrayMember({
          type: 'image',
          fields: [
            defineField({ name: 'alt', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'caption', type: 'string' }),
          ],
        }),
        defineArrayMember({
          name: 'code',
          type: 'object',
          fields: [
            defineField({ name: 'language', type: 'string' }),
            defineField({ name: 'code', type: 'text', rows: 12 }),
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'cover' } },
});
