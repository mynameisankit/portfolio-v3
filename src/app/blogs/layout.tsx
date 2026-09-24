import '@/features/blog/blog.css';

import { SiteFooter } from '@/features/layout/site-footer';
import { SiteHeader } from '@/features/layout/site-header';
import { getPortfolio } from '@/features/portfolio/repository';
export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const portfolio = await getPortfolio();
  return (
    <div className="site-shell" id="top">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SiteHeader content={portfolio} />
      <main id="main-content">{children}</main>
      <SiteFooter content={portfolio} />
    </div>
  );
}
