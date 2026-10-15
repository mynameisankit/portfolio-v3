import { defineArrayMember, defineField } from 'sanity';

export const contributionsField = defineField({
  name: 'contributions',
  title: 'Open source contributions',
  description:
    'Curated issue reports and pull requests, shown in this order. Leave unset to use the bundled entries; use an empty list to hide the section. Publish and rebuild to update the site.',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'contribution',
      type: 'object',
      fields: [
        defineField({
          name: 'kind',
          type: 'string',
          initialValue: 'issue',
          options: {
            list: [
              { title: 'Issue report', value: 'issue' },
              { title: 'Pull request', value: 'pullRequest' },
            ],
          },
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'repository',
          description: 'GitHub owner/repository, for example vercel/next.js.',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'number',
          title: 'Issue or PR number',
          type: 'number',
          validation: (rule) => rule.required().integer().positive(),
        }),
        defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
        defineField({
          name: 'summary',
          description: 'Describe your contribution and its impact.',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'GitHub issue or PR URL',
          type: 'url',
          validation: (rule) =>
            rule
              .required()
              .uri({ scheme: ['https'] })
              .custom((value) => {
                if (!value || value.startsWith('https://github.com/')) {
                  return true;
                }

                return 'Use a GitHub URL.';
              }),
        }),
      ],
      preview: { select: { title: 'title', subtitle: 'repository' } },
    }),
  ],
});
