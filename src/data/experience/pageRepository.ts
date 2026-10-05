import { cache } from 'react';
import { sanityClient } from '@/sanity/client';
import { experiencePageSchema } from './pageSchema';

const workProjection = `{
  "id": coalesce(id, _key),
  "title": [titleLine1, coalesce(titleLine2, "")],
  "category": coalesce(category, ""),
  paragraphs,
  "illustration": coalesce(illustration, "none"),
  "illustrationUrl": coalesce(illustrationAsset.asset->url, ""),
  "staticIllustrationUrl": coalesce(staticIllustrationAsset.asset->url, ""),
  "caption": coalesce(caption, "")
}`;

const query = `*[_type == "portfolioSite"] | order(_updatedAt desc)[0].experiencePage {
  "title": select(defined(titleLine1) => [titleLine1, coalesce(titleLine2, "")]),
  intro,
  selectedWorkHeading,
  "works": select(defined(works) => works[] ${workProjection}),
  tekionHeading,
  "tekionWorks": select(defined(tekionWorks) => tekionWorks[] ${workProjection}),
  designHeading,
  "designTitle": select(defined(designTitleLine1) => [designTitleLine1, coalesce(designTitleLine2, "")]),
  designParagraphs,
  alongsideHeading,
  alongsideParagraphs,
  careerHeading
}`;

export const getExperiencePage = cache(async () => {
  const document = await sanityClient.fetch<Record<string, unknown> | null>(query);
  const fields = Object.fromEntries(
    Object.entries(document ?? {}).filter(([, value]) => value !== null),
  );

  return experiencePageSchema.parse(fields);
});
