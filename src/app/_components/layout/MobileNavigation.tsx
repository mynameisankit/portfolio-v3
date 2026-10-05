'use client';

import { LanguageSelector } from '@/app/_components/localization/LanguageSelector';
import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { useCopy } from '@/app/_components/localization/useCopy';
import { ThemeToggle } from '@/app/_components/theme/ThemeToggle';
import { Button } from '@/app/_components/ui/Button';
import { SITE_NAVIGATION_ITEMS } from '@/config/navigationConfig';
import { cn } from '@/lib/className.utils';
import { useActiveNavigation } from './useActiveNavigation';
import { useMobileNavigation } from './useMobileNavigation';
import { Menu, X } from 'lucide-react';
import { Dialog } from 'radix-ui';

export function MobileNavigation({ github, hasSkills }: { github: string; hasSkills: boolean }) {
  const copy = useCopy();
  const activeItem = useActiveNavigation();
  const { isOpen, setIsOpen, closeMenu } = useMobileNavigation();
  const items = SITE_NAVIGATION_ITEMS.filter((item) => item.id !== 'skills' || hasSkills);

  return (
    <div className="shrink-0 min-[762px]:hidden">
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="size-11 rounded-xl"
            aria-label={copy('Open navigation menu')}
          >
            <Menu size={22} aria-hidden="true" />
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:animate-none min-[762px]:hidden" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-[70] flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-2xl border border-border bg-card p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-card-foreground shadow-xl duration-200 data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=closed]:fade-out-0 motion-reduce:animate-none min-[762px]:hidden">
            <div className="flex items-center justify-between gap-4">
              <Dialog.Title className="text-2xl font-medium tracking-tight">
                <Text>Navigation</Text>
              </Dialog.Title>
              <Dialog.Close asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-11 shrink-0 rounded-xl"
                  aria-label={copy('Close navigation menu')}
                >
                  <X size={22} aria-hidden="true" />
                </Button>
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">
              <Text>Explore the portfolio and adjust your preferences.</Text>
            </Dialog.Description>
            <nav aria-label={copy('Main navigation')} className="mt-6 flex flex-col gap-2">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={activeItem === item.id ? 'page' : undefined}
                  className={cn(
                    'rounded-xl px-4 py-3 text-lg transition-colors hover:bg-button-hover hover:text-primary motion-reduce:transition-none',
                    activeItem === item.id && 'bg-primary/10 text-primary',
                  )}
                >
                  <Text>{item.label}</Text>
                </Link>
              ))}
              <Link
                href={github}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-lg transition-colors hover:bg-button-hover hover:text-primary motion-reduce:transition-none"
              >
                <Text>GitHub ↗</Text>
              </Link>
            </nav>
            <div className="mt-6 flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
