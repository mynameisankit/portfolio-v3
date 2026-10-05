'use client';
import type { ComponentProps } from 'react';
import NextLink from 'next/link';
import { useLocale } from 'next-intl';

type LinkProps = ComponentProps<typeof NextLink>;

export default function LocalizedLink({ href, ...props }: LinkProps) {
  const locale = useLocale();
  const isLocalized =
    typeof href === 'string' && href.startsWith('/') && !href.startsWith('//') && locale !== 'en';
  const url = new URL(typeof href === 'string' ? href : '/', 'https://ankitkumar.fyi');
  if (isLocalized) {
    url.searchParams.set('lang', locale);
  }
  const localizedPath = `${url.pathname}${url.search}${url.hash}`;
  const destination = isLocalized ? localizedPath : href;

  return <NextLink href={destination} {...props} />;
}
