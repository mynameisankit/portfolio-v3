'use client';
import { NextIntlClientProvider } from 'next-intl';
import { useEffect, useSyncExternalStore } from 'react';

import { getLocaleSnapshot, subscribeLocale } from './locale-store';
import { TranslationContext } from './translation-context';
import type { TranslationEntry } from './translation-model';

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
