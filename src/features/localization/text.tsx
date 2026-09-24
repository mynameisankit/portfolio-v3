'use client';
import { useFormatter, useLocale } from 'next-intl';
import { useContext } from 'react';

import { catalog } from './catalog';
import { type Locale, sourceKey } from './model';
import { TranslationContext } from './translation-context';

export function useCopy() {
  const locale = useLocale() as Locale;
  const translations = useContext(TranslationContext);
  return (source: string) =>
    locale === 'en'
      ? source
      : (translations.find(
          (entry) => entry.locale === locale && sourceKey(entry.source) === sourceKey(source),
        )?.translation ??
        catalog.get(sourceKey(source))?.[locale] ??
        source);
}
export function Text({ children }: { children: string | undefined }) {
  const copy = useCopy();
  const locale = useLocale();
  const source = children ?? '';
  const translated = copy(source);
  return (
    <span lang={locale !== 'en' && translated === source ? 'en' : undefined}>{translated}</span>
  );
}
export function LocalizedDate({ value }: { value: string }) {
  const format = useFormatter();
  return (
    <time dateTime={value}>
      {format.dateTime(new Date(value), { day: 'numeric', month: 'short', year: 'numeric' })}
    </time>
  );
}
