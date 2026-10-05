import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/siteConfig';
import { categories, postPath } from '@/data/blog/model';
import { getPosts } from '@/data/blog/repository';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteConfig.url}/experience`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteConfig.url}/blogs`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteConfig.url}/hobbies`, changeFrequency: 'monthly', priority: 0.7 },
  ];
  const categoryPages: MetadataRoute.Sitemap = categories.map(({ slug }) => ({
    url: `${siteConfig.url}/blogs/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
  const articlePages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}${postPath(post)}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
