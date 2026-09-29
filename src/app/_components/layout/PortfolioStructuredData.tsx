import { siteConfig } from '@/config/siteConfig';
import type { PortfolioContent } from '@/data/portfolio/content';

export function PortfolioStructuredData({ content }: { content: PortfolioContent }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: content.name,
    url: siteConfig.url,
    jobTitle: content.role,
    worksFor: { '@type': 'Organization', name: content.company },
    sameAs: [content.github],
  };
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
