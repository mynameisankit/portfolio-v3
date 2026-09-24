import { defineField, defineType } from 'sanity';
export const translation = defineType({
  name: 'translation',
  title: 'Translation',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      title: 'Exact English source',
      type: 'text',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'locale',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'Dutch', value: 'nl' },
          { title: 'German', value: 'de' },
          { title: 'Swedish', value: 'sv' },
          { title: 'Japanese', value: 'ja' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'translation', type: 'text', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'source', subtitle: 'locale' } },
});
