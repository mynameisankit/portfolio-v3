import { defineArrayMember, defineField } from 'sanity';

export const skillsField = defineField({
  name: 'skills',
  title: 'Skills',
  description:
    'Group skills by focus area. Drag groups and skills to reorder them. An empty list hides the section.',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'skillCategory',
      type: 'object',
      fields: [
        defineField({
          name: 'id',
          title: 'Stable ID',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
        defineField({
          name: 'items',
          title: 'Skills',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'skill',
              fields: [
                defineField({
                  name: 'name',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'Reference link',
                  type: 'url',
                  validation: (rule) => rule.required().uri({ scheme: ['https'] }),
                }),
                defineField({
                  name: 'icon',
                  type: 'string',
                  initialValue: 'code',
                  options: {
                    list: [
                      'terminal',
                      'hammer',
                      'zap',
                      'atom',
                      'fileCode',
                      'braces',
                      'code',
                      'palette',
                      'network',
                      'workflow',
                      'blocks',
                      'layers',
                      'packageCheck',
                      'sparkles',
                      'gitBranch',
                    ],
                  },
                }),
              ],
              preview: { select: { title: 'name', subtitle: 'url' } },
            }),
          ],
          validation: (rule) => rule.required().min(1).unique(),
        }),
      ],
      preview: { select: { title: 'title' } },
    }),
  ],
});
