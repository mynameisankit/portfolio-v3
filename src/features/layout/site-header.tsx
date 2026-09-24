import { Brand } from '@/features/brand/brand';
import { LanguageSelector } from '@/features/localization/language-selector';
import Link from '@/features/localization/link';
import { Text } from '@/features/localization/text';
import type { PortfolioContent } from '@/features/portfolio/content';
import { ThemeToggle } from '@/features/theme/theme-toggle';
export function SiteHeader({ content }: { content: PortfolioContent }) {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="ankitkumar.fyi home">
        <Brand />
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#projects">
          <Text>{'Projects'}</Text>
        </Link>
        <Link href="/#experience">
          <Text>{'Experience'}</Text>
        </Link>
        <Link href="/blogs">
          <Text>{'Writing'}</Text>
        </Link>
        <Link href="/hobbies">
          <Text>{'Hobbies'}</Text>
        </Link>
        <Link href={content.github} target="_blank" rel="noreferrer">
          <Text>{'GitHub ↗'}</Text>
        </Link>
        <ThemeToggle />
        <LanguageSelector />
      </nav>
    </header>
  );
}
