import { cache } from 'react';
import { sanityClient } from '@/sanity/client';
import type { Post } from './model';
import { type PortableTextBlock, toPlainText } from '@portabletext/react';

export type StoryImage = {
  _type: 'image';
  _key: string;
  url: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  lqip: string;
};

type Story = Pick<Post, 'title' | 'description' | 'slug' | 'date' | 'tags'> & {
  category: 'travelling' | 'video-games';
  cover: StoryImage;
  blocks: ((PortableTextBlock & { _type: 'block' }) | StoryImage)[];
};

const imageProjection = `_type, _key, alt, caption, "url": asset->url,
  "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height,
  "lqip": coalesce(asset->metadata.lqip, "")`;
const query = `*[_type == "experiencePost" && category in ["travelling","video-games"]
  && defined(title) && title != "" && defined(cover.asset->url) && defined(slug.current) && select(isDraft == true => $includeDrafts, dateTime(date) <= dateTime(now()))]{
  title, "description": coalesce(description, ""), category, date, "slug": slug.current, "tags": coalesce(tags, []),
  "cover": cover{${imageProjection}},
  "blocks": body[_type == "block" || (_type == "image" && defined(asset->url))]{
    _type == "block" => {...}, _type == "image" => {${imageProjection}}
  }
}`;

export const getStories = cache(() =>
  sanityClient.fetch<Story[]>(query, { includeDrafts: process.env.NODE_ENV === 'development' }),
);

export async function getSanityPosts(): Promise<Post[]> {
  const stories = await getStories();

  return stories.map(({ blocks, ...post }) => {
    const body = blocks
      .map((block) => {
        if (block._type === 'image') {
          return block.caption ?? '';
        }

        return toPlainText(block);
      })
      .filter(Boolean);
    const minutes = Math.max(
      1,
      Math.ceil(body.join(' ').split(/\s+/).filter(Boolean).length / 220),
    );

    return { ...post, body, minutes };
  });
}
