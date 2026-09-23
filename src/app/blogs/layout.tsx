import '@/features/blog/blog.css';

import { SiteFooter } from '@/features/layout/site-footer';
import { SiteHeader } from '@/features/layout/site-header';
import { portfolio } from '@/features/portfolio/content';
export default function BlogLayout({ children }: { children: React.ReactNode }) {
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
