import { categories } from '../../data/blog/model';
import {
  defineArrayMember,
  defineField,
  defineType,
  type ObjectInputProps,
  PatchEvent,
  setIfMissing,
} from 'sanity';

function PublicationDateInput(props: ObjectInputProps) {
  return props.renderDefault({
    ...props,
    onChange(change) {
      const event = PatchEvent.from(change);
      const isReleasingDraft = event.patches.some(
        (patch) =>
          patch.path.length === 1 &&
          patch.path[0] === 'isDraft' &&
          patch.type === 'set' &&
          patch.value === false,
      );
      if (isReleasingDraft) {
        props.onChange(event.append(setIfMissing(new Date().toISOString(), ['date'])));

        return;
      }
      props.onChange(event);
    },
  });
}

const imageFields = [
  defineField({
    name: 'alt',
    title: 'Alternative text',
    type: 'string',
    validation: (rule) => rule.required(),
  }),
  defineField({ name: 'caption', type: 'string' }),
];

export const experiencePost = defineType({
  name: 'experiencePost',
  title: 'Experience post',
  type: 'document',
  components: { input: PublicationDateInput },
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: categories
          .filter((category) => category.slug !== 'technical')
          .map((category) => ({ title: category.label, value: category.slug })),
      },
      validation: (rule) => rule.required(),
    }),
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
              'Use lowercase letters, numbers and hyphens.',
          ),
    }),
    defineField({
      name: 'description',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'isDraft',
      title: 'Draft',
      type: 'boolean',
      initialValue: true,
      description: 'Show this post only in local development after publishing it in Studio.',
    }),
    defineField({
      name: 'date',
      title: 'Publication date',
      type: 'datetime',
      description:
        'Set automatically when Draft is switched off. Choose a future date to schedule publication.',
      validation: (rule) =>
        rule.custom((value, context) =>
          value || context.document?.isDraft === true ? true : 'A publication date is required.',
        ),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'cover',
      title: 'Header image',
      type: 'image',
      fields: imageFields,
      validation: (rule) => rule.required().assetRequired(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Subheading', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
        }),
        defineArrayMember({ type: 'image', fields: imageFields }),
      ],
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'cover' } },
});
