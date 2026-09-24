import { cache } from 'react';
import { z } from 'zod';

import { sanityClient } from '@/sanity/client';

import type { Post } from './model';

const postSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  category: z.enum(['technical', 'travelling', 'video-games']),
  title: z.string().min(1),
  description: z.string(),
  date: z.string().datetime({ offset: true }),
  tags: z.array(z.string()).default([]),
  bodyText: z.string().default(''),
  richBody: z.array(z.object({ _type: z.string() }).passthrough()).default([]),
  cover: z.object({ url: z.string().url(), alt: z.string() }).nullable(),
});
const query =
  '*[_type == "blogPost" && defined(slug.current) && defined(publishedAt) && dateTime(publishedAt) <= dateTime(now())] | order(publishedAt desc) {title, "slug": slug.current, category, "description": coalesce(description, ""), "date": publishedAt, "tags": coalesce(tags, []), "bodyText": coalesce(pt::text(body), ""), "richBody": coalesce(body[]{..., _type == "image" => {"url": asset->url}}, []), "cover": select(defined(cover.asset) => {"url": cover.asset->url, "alt": coalesce(cover.alt, "")}, null)}';

export const getPosts = cache(async (): Promise<Post[]> => {
  const documents = z.array(postSchema).parse(await sanityClient.fetch<unknown>(query));
  return documents.map(({ bodyText, ...document }) => ({
    ...document,
    body: bodyText ? [bodyText] : [],
    minutes: Math.max(1, Math.ceil(bodyText.split(/\s+/).filter(Boolean).length / 220)),
    sample: false,
  }));
});
