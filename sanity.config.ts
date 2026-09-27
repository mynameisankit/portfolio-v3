import { sanityProject } from './src/config/sanityConfig';
import { blogPost } from './src/sanity/schemas/blogPost';
import { portfolioSite } from './src/sanity/schemas/portfolioSite';
import { translation } from './src/sanity/schemas/translation';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  name: 'portfolio',
  title: 'Ankit — Portfolio & Writing',
  projectId: sanityProject.projectId,
  dataset: sanityProject.dataset,
  plugins: [
    structureTool({
      structure: (builder) =>
        builder
          .list()
          .title('Content')
          .items([
            builder
              .listItem()
              .title('Portfolio')
              .child(builder.document().schemaType('portfolioSite').documentId('portfolio')),
            builder.documentTypeListItem('blogPost').title('Blog posts'),
            builder.documentTypeListItem('translation').title('Translations'),
          ]),
    }),
  ],
  schema: {
    types: [portfolioSite, blogPost, translation],
    templates: (templates) =>
      templates.filter((template) => template.schemaType !== 'portfolioSite'),
  },
  document: {
    actions: (actions, context) => {
      if (context.schemaType === 'portfolioSite') {
        return actions.filter((action) => !['duplicate', 'delete'].includes(action.action ?? ''));
      }

      return actions;
    },
  },
});
