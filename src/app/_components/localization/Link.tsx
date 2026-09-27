'use client';
import type { ComponentProps } from 'react';
import NextLink from 'next/link';
import { useLocale } from 'next-intl';
import type { PreviewData } from '@/app/_components/linkPreview/previewData';
import { PreviewHover } from '@/app/_components/linkPreview/PreviewHover';

type LinkProps = ComponentProps<typeof NextLink> & { preview?: PreviewData };

export default function LocalizedLink({ href, preview, ...props }: LinkProps) {
  const locale = useLocale();
  const isLocalized =
    typeof href === 'string' && href.startsWith('/') && !href.startsWith('//') && locale !== 'en';
  const url = new URL(typeof href === 'string' ? href : '/', 'https://ankitkumar.fyi');
  if (isLocalized) {
    url.searchParams.set('lang', locale);
  }
  const localizedPath = `${url.pathname}${url.search}${url.hash}`;
  const destination = isLocalized ? localizedPath : href;
  const link = <NextLink href={destination} {...props} />;

  if (typeof destination === 'string') {
    return (
      <PreviewHover href={destination} preview={preview}>
        {link}
      </PreviewHover>
    );
  }

  return link;
}
