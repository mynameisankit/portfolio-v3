'use client';
import { useContext } from 'react';
import { useLocale } from 'next-intl';
import { catalog } from '@/localization/catalog';
import { type Locale, sourceKey } from '@/localization/model';
import { TranslationContext } from './translationContext';

export function useCopy() {
  const locale = useLocale() as Locale;
  const translations = useContext(TranslationContext);

  return (source: string) => {
    if (locale === 'en') {
      return source;
    }

    return (
      translations.find(
        (entry) => entry.locale === locale && sourceKey(entry.source) === sourceKey(source),
      )?.translation ??
      catalog.get(sourceKey(source))?.[locale] ??
      source
    );
  };
}
