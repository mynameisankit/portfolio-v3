import { cache } from 'react';
import { sanityClient } from '@/sanity/client';
import { z } from 'zod';

const schema = z.array(
  z.object({
    source: z.string(),
    locale: z.enum(['nl', 'de', 'sv', 'ja']),
    translation: z.string(),
  }),
);

export const getTranslations = cache(async () =>
  schema.parse(
    await sanityClient.fetch<unknown>(
      '*[_type == "translation" && defined(source) && defined(translation)]{source,locale,translation}',
    ),
  ),
);
