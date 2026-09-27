'use client';
import { useLocale } from 'next-intl';
import { useCopy } from './useCopy';

export function Text({ children }: { children: string | undefined }) {
  const copy = useCopy();
  const locale = useLocale();
  const source = children ?? '';
  const translated = copy(source);

  return (
    <span lang={locale !== 'en' && translated === source ? 'en' : undefined}>{translated}</span>
  );
}
