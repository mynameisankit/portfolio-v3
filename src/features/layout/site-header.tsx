import Link from 'next/link';

import type { PortfolioContent } from '@/features/portfolio/content';
import { ThemeToggle } from '@/features/theme/theme-toggle';
export function SiteHeader({ content }: { content: PortfolioContent }) {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Ankit Kumar home">
        ak<span>↗</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#projects">Projects</Link>
        <Link href="/#experience">Experience</Link>
        <Link href="/blogs">Writing</Link>
        <a href={content.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
