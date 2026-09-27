import { sanityProject } from './src/config/sanityConfig';
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  project: { basePath: '/studio' },
  api: { projectId: sanityProject.projectId, dataset: sanityProject.dataset },
});
