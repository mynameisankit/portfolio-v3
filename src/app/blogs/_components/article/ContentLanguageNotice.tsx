'use client';
import { useLocale } from 'next-intl';
import { Text } from '@/app/_components/localization/Text';
import { useCopy } from '@/app/_components/localization/useCopy';

export function ContentLanguageNotice({ sources }: { sources: string[] }) {
  const locale = useLocale();
  const translate = useCopy();
  if (locale === 'en' || sources.every((source) => !source || translate(source) !== source)) {
    return null;
  }

  return (
    <p className="blog-notice text-muted-foreground font-mono text-[12px] leading-[1.6] my-5 mx-0">
      <Text>Some article content is available only in English.</Text>
    </p>
  );
}
