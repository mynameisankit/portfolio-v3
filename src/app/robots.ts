import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/siteConfig';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/manage/', '/studio/', '/blogs/preview-empty', '/blogs/preview-samples/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
