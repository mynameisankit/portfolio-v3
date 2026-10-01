export const categories = [
  {
    slug: 'technical',
    label: 'Technical',
    description: 'Notes on building software and frontend infrastructure.',
  },
  { slug: 'travelling', label: 'Travelling', description: 'Trips, trails, and time on the road.' },
  {
    slug: 'video-games',
    label: 'Video games',
    description: 'Games, their systems, and the moments that stay with me.',
  },
] as const;
export type Category = (typeof categories)[number]['slug'];
export type Post = {
  slug: string;
  category: Category;
  title: string;
  description: string;
  date: string;
  minutes: number;
  tags: string[];
  body: string[];
  isSample: boolean;
  richBody?: { _type: string; [key: string]: unknown }[];
  cover?: { url: string; alt: string; lqip: string } | null;
};
export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
export function postPath(post: Post) {
  if (post.isSample) {
    return `/blogs/preview-samples/${post.slug}`;
  }

  return `/blogs/${post.category}/${post.slug}`;
}
