import { createClient } from '@sanity/client';

import { sanityProject } from './project';

// Server/build use only. The public dataset does not require a read token.
export const sanityClient = createClient({
  ...sanityProject,
  useCdn: false,
  perspective: 'published',
  requestTagPrefix: 'portfolio',
  timeout: 15000,
});
