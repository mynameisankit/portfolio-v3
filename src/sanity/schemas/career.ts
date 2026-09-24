import { defineArrayMember, defineField } from 'sanity';

export const careerField = defineField({
  name: 'career',
  title: 'Career journey',
  description: 'Order entries from most recent to earliest. Include roles and education.',
  type: 'array',
  validation: (rule) => rule.required().min(1),
  of: [
    defineArrayMember({
      type: 'object',
      name: 'careerEntry',
      fields: [
        ...['id', 'organization', 'role', 'period'].map((name) =>
          defineField({
            name,
            type: 'string',
            validation: (rule) => rule.required(),
          }),
        ),
        defineField({ name: 'location', type: 'string' }),
        defineField({
          name: 'current',
          title: 'Current role',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({ name: 'summary', type: 'text', validation: (rule) => rule.required() }),
        defineField({
          name: 'highlights',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
        }),
      ],
      preview: { select: { title: 'organization', subtitle: 'period' } },
    }),
  ],
});
