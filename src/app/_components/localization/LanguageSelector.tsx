'use client';
import { useLocale } from 'next-intl';
import { isLocale, languageNames, locales } from '@/localization/model';
import { changeLocale } from './localeStore.utils';
import { useCopy } from './useCopy';
import { Check, ChevronDown } from 'lucide-react';
import { Select } from 'radix-ui';

export function LanguageSelector() {
  const locale = useLocale();
  const copy = useCopy();

  return (
    <Select.Root
      value={locale}
      onValueChange={(value) => {
        if (isLocale(value)) {
          changeLocale(value);
        }
      }}
    >
      <Select.Trigger
        aria-label={copy('Language')}
        className="language-selector-trigger group inline-flex min-h-11 min-w-32 cursor-pointer items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-button-hover focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary data-[state=open]:border-primary/50 data-[state=open]:bg-secondary motion-reduce:transition-none"
      >
        <Select.Value />
        <Select.Icon asChild>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180 motion-reduce:transition-none"
          />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          align="end"
          sideOffset={8}
          collisionPadding={12}
          className="z-[80] max-h-[var(--radix-select-content-available-height)] min-w-[max(10rem,var(--radix-select-trigger-width))] overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none"
        >
          <Select.Viewport className="p-1.5">
            {locales.map((language) => (
              <Select.Item
                key={language}
                value={language}
                lang={language}
                className="relative flex min-h-11 cursor-pointer select-none items-center rounded-lg py-2 pr-9 pl-3 text-sm outline-none data-[highlighted]:bg-button-hover data-[highlighted]:text-primary data-[state=checked]:text-primary"
              >
                <Select.ItemText>{languageNames[language]}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-3 inline-flex items-center">
                  <Check size={16} aria-hidden="true" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
