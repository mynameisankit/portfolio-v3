import { Brand } from '@/app/_components/brand/Brand';
import { LanguageSelector } from '@/app/_components/localization/LanguageSelector';
import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { ThemeToggle } from '@/app/_components/theme/ThemeToggle';
import { ConditionalRenderer } from '@/app/_components/ui/ConditionalRenderer';
import type { PortfolioContent } from '@/data/portfolio/content';
import { FloatingNavigation } from './FloatingNavigation';
import { MobileNavigation } from './MobileNavigation';
import { PortfolioStructuredData } from './PortfolioStructuredData';

export function SiteHeader({ content }: { content: PortfolioContent }) {
  return (
    <>
      <header className="site-header flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-border px-[5%] py-5 max-[761px]:gap-3">
        <Link
          href="/"
          className="wordmark inline-flex [&_.brand-symbol]:size-9 [&_.brand-name]:text-[20px] min-[2560px]:[&_.brand-symbol]:size-10 min-[2560px]:[&_.brand-name]:text-[23px]"
          aria-label="ankitkumar.fyi home"
        >
          <Brand />
        </Link>
        <nav
          className="flex flex-wrap items-center gap-1.5 text-[15px] min-[2560px]:text-[17px] [&>a]:rounded-xl [&>a]:px-2 [&>a]:py-2 [&>a]:transition-colors [&>a:hover]:bg-button-hover [&>a:hover]:text-primary [&>a]:motion-reduce:transition-none max-[761px]:hidden"
          aria-label="Main navigation"
        >
          <Link className="hover:text-primary" href="/#projects">
            <Text>Projects</Text>
          </Link>
          <ConditionalRenderer shouldRender={!!content.skills.length}>
            <Link className="hover:text-primary" href="/#skills">
              <Text>Skills</Text>
            </Link>
          </ConditionalRenderer>
          <Link className="hover:text-primary" href="/blogs">
            <Text>Writing</Text>
          </Link>
          <Link className="hover:text-primary" href="/hobbies">
            <Text>Hobbies</Text>
          </Link>
          <ThemeToggle />
          <LanguageSelector />
        </nav>
        <MobileNavigation hasSkills={content.skills.length > 0} />
      </header>
      <FloatingNavigation content={content} />
      <PortfolioStructuredData content={content} />
    </>
  );
}
