import type { PortfolioContent } from '@/features/portfolio/content';
export function SiteFooter({ content }: { content: PortfolioContent }) {
  return (
    <footer className="site-footer">
      <span>{content.name}</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
