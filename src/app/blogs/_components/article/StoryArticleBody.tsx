import { notFound } from 'next/navigation';
import type { Post } from '@/data/blog/model';
import { getStories } from '@/data/blog/sanityRepository';
import { ArticleLink } from './ArticleLink';
import { StoryImageFigure } from './StoryImageFigure';
import { PortableText } from '@portabletext/react';

export async function StoryArticleBody({ post }: { post: Post }) {
  const stories = await getStories();
  const story = stories.find((item) => item.category === post.category && item.slug === post.slug);
  if (!story) {
    notFound();
  }

  return (
    <PortableText
      value={story.blocks}
      components={{
        marks: {
          link: ({ value, children }) => <ArticleLink href={value?.href}>{children}</ArticleLink>,
        },
        types: { image: StoryImageFigure },
      }}
    />
  );
}
