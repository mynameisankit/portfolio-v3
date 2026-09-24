import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { sanityProject } from './src/sanity/project';
import { translation } from './src/sanity/schemas/translation';
import { blogPost } from './src/sanity/schemas/blog-post';
import { portfolioSite } from './src/sanity/schemas/portfolio-site';

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
    actions: (actions, context) =>
      context.schemaType === 'portfolioSite'
        ? actions.filter((action) => !['duplicate', 'delete'].includes(action.action ?? ''))
        : actions,
  },
});
