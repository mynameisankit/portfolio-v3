'use client';
import { useEffect, useSyncExternalStore } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import type { TranslationEntry } from '@/localization/translationModel';
import { getLocaleSnapshot, subscribeLocale } from './localeStore.utils';
import { TranslationContext } from './translationContext';

export function LocalizationProvider({
  children,
  translations,
}: {
  children: React.ReactNode;
  translations: TranslationEntry[];
}) {
  const locale = useSyncExternalStore(subscribeLocale, getLocaleSnapshot, () => 'en');

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={{}} timeZone="UTC">
      <TranslationContext.Provider value={translations}>{children}</TranslationContext.Provider>
    </NextIntlClientProvider>
  );
}
