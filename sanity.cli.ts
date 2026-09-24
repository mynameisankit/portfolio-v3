import { defineCliConfig } from 'sanity/cli';
import { sanityProject } from './src/sanity/project';
export default defineCliConfig({
  project: { basePath: '/studio' },
  api: { projectId: sanityProject.projectId, dataset: sanityProject.dataset },
});
