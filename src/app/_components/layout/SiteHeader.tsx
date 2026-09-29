import { Brand } from '@/app/_components/brand/Brand';
import { LanguageSelector } from '@/app/_components/localization/LanguageSelector';
import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { ThemeToggle } from '@/app/_components/theme/ThemeToggle';
import type { PortfolioContent } from '@/data/portfolio/content';
import { FloatingNavigation } from './FloatingNavigation';
import { PortfolioStructuredData } from './PortfolioStructuredData';

export function SiteHeader({ content }: { content: PortfolioContent }) {
  return (
    <>
      <header className="site-header flex flex-wrap items-center justify-between gap-5 border-b border-border px-[5%] py-6 max-[761px]:gap-4 max-[521px]:gap-3">
        <Link href="/" className="wordmark inline-flex" aria-label="ankitkumar.fyi home">
          <Brand />
        </Link>
        <nav
          className="flex flex-wrap items-center gap-7 text-[14px] max-[761px]:w-full max-[761px]:justify-between max-[761px]:gap-3 max-[651px]:text-[13px]"
          aria-label="Main navigation"
        >
          <Link className="hover:text-primary" href="/#projects">
            <Text>Projects</Text>
          </Link>
          <Link className="hover:text-primary" href="/#experience">
            <Text>Experience</Text>
          </Link>
          {!!content.skills.length && (
            <Link className="hover:text-primary" href="/#skills">
              <Text>Skills</Text>
            </Link>
          )}
          <Link className="hover:text-primary" href="/blogs">
            <Text>Writing</Text>
          </Link>
          <Link className="hover:text-primary" href="/hobbies">
            <Text>Hobbies</Text>
          </Link>
          <Link
            className="hover:text-primary"
            href={content.github}
            target="_blank"
            rel="noreferrer"
          >
            <Text>GitHub ↗</Text>
          </Link>
          <ThemeToggle />
          <LanguageSelector />
        </nav>
      </header>
      <FloatingNavigation content={content} />
      <PortfolioStructuredData content={content} />
    </>
  );
}
