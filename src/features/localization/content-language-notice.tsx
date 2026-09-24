'use client';
import { useLocale } from 'next-intl';

import { Text, useCopy } from './text';

export function ContentLanguageNotice({ sources }: { sources: string[] }) {
  const locale = useLocale();
  const translate = useCopy();
  if (locale === 'en' || sources.every((source) => !source || translate(source) !== source)) {
    return null;
  }
  return (
    <p className="blog-notice">
      <Text>{'Some article content is available only in English.'}</Text>
    </p>
  );
}
