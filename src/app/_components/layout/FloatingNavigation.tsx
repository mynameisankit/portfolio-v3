'use client';
import { Brand } from '@/app/_components/brand/Brand';
import { LanguageSelector } from '@/app/_components/localization/LanguageSelector';
import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { ThemeToggle } from '@/app/_components/theme/ThemeToggle';
import { ConditionalRenderer } from '@/app/_components/ui/ConditionalRenderer';
import type { PortfolioContent } from '@/data/portfolio/content';
import { cn } from '@/lib/utils';
import { useActiveNavigation } from './useActiveNavigation';
import { useIsPastFold } from './useIsPastFold';

export function FloatingNavigation({ content }: { content: PortfolioContent }) {
  const isPastFold = useIsPastFold();
  const activeItem = useActiveNavigation();
  const navigationItemClass = (item: string) =>
    cn(
      'shrink-0 rounded-xl px-4 py-3 text-[17px] transition-colors hover:bg-secondary/80 hover:text-primary focus-visible:bg-secondary max-[521px]:px-3 max-[521px]:py-2.5 max-[521px]:text-[14px]',
      activeItem === item && 'bg-secondary text-primary',
    );

  return (
    <>
      <header
        className={cn(
          'fixed top-4 left-1/2 z-50 flex w-[min(calc(100%-2rem),720px)] -translate-x-1/2 items-center justify-between gap-3 rounded-2xl border border-border/70 bg-background/65 px-4 py-3 shadow-[0_16px_40px_#0005] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 motion-reduce:transition-none max-[521px]:w-[calc(100%-1rem)]',
          isPastFold ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0',
        )}
        aria-label="Compact site navigation"
        aria-hidden={!isPastFold}
        inert={!isPastFold}
      >
        <Link
          href="/"
          className="inline-flex min-w-0 [&_.brand-symbol]:size-10 [&_.brand]:gap-2.5 [&_.brand-name]:text-[21px] max-[521px]:[&_.brand-symbol]:size-9 max-[521px]:[&_.brand-name]:text-[18px]"
          aria-label="ankitkumar.fyi home"
          tabIndex={isPastFold ? undefined : -1}
        >
          <Brand />
        </Link>
        <div className="flex shrink-0 items-center gap-2.5 [&_.theme-toggle]:size-10 [&_.language-selector_select]:max-w-[115px] [&_.language-selector_select]:px-3 [&_.language-selector_select]:py-2.5 [&_.language-selector_select]:text-[16px] max-[521px]:gap-2 max-[521px]:[&_.theme-toggle]:size-9 max-[521px]:[&_.language-selector_select]:max-w-[105px] max-[521px]:[&_.language-selector_select]:px-2.5 max-[521px]:[&_.language-selector_select]:py-2 max-[521px]:[&_.language-selector_select]:text-[14px]">
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </header>
      <nav
        className={cn(
          'fixed bottom-4 left-1/2 z-50 flex w-[min(calc(100%-2rem),920px)] -translate-x-1/2 items-center justify-center gap-1 overflow-x-auto rounded-2xl border border-border/70 bg-background/65 p-3 shadow-[0_16px_40px_#0005] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 motion-reduce:transition-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[521px]:w-[calc(100%-1rem)]',
          isPastFold ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
        )}
        aria-label="Quick navigation"
        aria-hidden={!isPastFold}
        inert={!isPastFold}
      >
        <Link
          className={navigationItemClass('projects')}
          href="/#projects"
          aria-current={activeItem === 'projects' ? 'page' : undefined}
          tabIndex={isPastFold ? undefined : -1}
        >
          <Text>Projects</Text>
        </Link>
        <Link
          className={navigationItemClass('experience')}
          href="/#experience"
          aria-current={activeItem === 'experience' ? 'page' : undefined}
          tabIndex={isPastFold ? undefined : -1}
        >
          <Text>Experience</Text>
        </Link>
        <ConditionalRenderer shouldRender={!!content.skills.length}>
          <Link
            className={navigationItemClass('skills')}
            href="/#skills"
            aria-current={activeItem === 'skills' ? 'page' : undefined}
            tabIndex={isPastFold ? undefined : -1}
          >
            <Text>Skills</Text>
          </Link>
        </ConditionalRenderer>
        <Link
          className={navigationItemClass('blogs')}
          href="/blogs"
          aria-current={activeItem === 'blogs' ? 'page' : undefined}
          tabIndex={isPastFold ? undefined : -1}
        >
          <Text>Writing</Text>
        </Link>
        <Link
          className={navigationItemClass('hobbies')}
          href="/hobbies"
          aria-current={activeItem === 'hobbies' ? 'page' : undefined}
          tabIndex={isPastFold ? undefined : -1}
        >
          <Text>Hobbies</Text>
        </Link>
        <Link
          className="shrink-0 rounded-xl px-4 py-3 text-[17px] hover:bg-secondary/80 hover:text-primary focus-visible:bg-secondary max-[521px]:px-3 max-[521px]:py-2.5 max-[521px]:text-[14px]"
          href={content.github}
          target="_blank"
          rel="noreferrer"
          tabIndex={isPastFold ? undefined : -1}
        >
          <Text>GitHub ↗</Text>
        </Link>
      </nav>
    </>
  );
}
