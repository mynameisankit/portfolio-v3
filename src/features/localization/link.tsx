'use client';
import NextLink from 'next/link';
import { useLocale } from 'next-intl';
import type { ComponentProps } from 'react';

import type { PreviewData } from '@/features/link-preview/preview-data';
import { PreviewHover } from '@/features/link-preview/preview-hover';

type LinkProps = ComponentProps<typeof NextLink> & { preview?: PreviewData };

export default function LocalizedLink({ href, preview, ...props }: LinkProps) {
  const locale = useLocale();
  const localized =
    typeof href === 'string' && href.startsWith('/') && !href.startsWith('//') && locale !== 'en';
  const url = new URL(typeof href === 'string' ? href : '/', 'https://ankitkumar.fyi');
  if (localized) {
    url.searchParams.set('lang', locale);
  }
  const destination = localized ? `${url.pathname}${url.search}${url.hash}` : href;
  const link = <NextLink href={destination} {...props} />;
  return typeof destination === 'string' ? (
    <PreviewHover href={destination} preview={preview}>
      {link}
    </PreviewHover>
  ) : (
    link
  );
}
