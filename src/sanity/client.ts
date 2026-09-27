import { sanityProject } from '@/config/sanityConfig';
import { createClient } from '@sanity/client';

// Server/build use only. The public dataset does not require a read token.
export const sanityClient = createClient({
  ...sanityProject,
  useCdn: false,
  perspective: 'published',
  requestTagPrefix: 'portfolio',
  timeout: 15000,
});
