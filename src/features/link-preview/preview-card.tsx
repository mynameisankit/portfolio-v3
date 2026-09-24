'use client';

import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { useCallback } from 'react';

import { useCopy } from '@/features/localization/text';

import { getPreviewData, type PreviewData } from './preview-data';

export function PreviewCard({ href, preview }: { href: string; preview?: PreviewData }) {
  const copy = useCopy();
  const data = getPreviewData(href, preview);
  const fetcher = useCallback(
    async () => ({
      title: copy(data.title),
      description: copy(data.description),
      image: data.image ? new URL(data.image, window.location.origin).href : '',
      siteName: '',
      hostname: data.hostname,
    }),
    [copy, data.title, data.description, data.image, data.hostname],
  );
  return (
    <LinkPreview
      url={href}
      fetcher={fetcher}
      width="100%"
      margin={0}
      imageHeight={160}
      borderRadius={10}
      descriptionLength={160}
      backgroundColor="var(--card)"
      primaryTextColor="var(--foreground)"
      secondaryTextColor="var(--muted-foreground)"
      borderColor="var(--border)"
      showLoader={false}
      showPlaceholderIfNoImage={!!data.image}
      fallbackImageSrc={data.fallbackImage}
      className="link-preview-card"
    />
  );
}
