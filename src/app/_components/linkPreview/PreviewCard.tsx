'use client';
import { useCallback } from 'react';
import { useCopy } from '@/app/_components/localization/useCopy';
import { getPreviewData, getPreviewImage, type PreviewData } from './previewData';
import { LinkPreview } from '@dhaiwat10/react-link-preview';

export function PreviewCard({ href, preview }: { href: string; preview?: PreviewData }) {
  const copy = useCopy();
  const data = getPreviewData(href, preview);
  const fetcher = useCallback(
    async () => ({
      title: copy(data.title),
      description: copy(data.description),
      image: getPreviewImage(data.image),
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
      className="link-preview-card font-sans text-[14px] leading-[1.5] [overflow-wrap:anywhere] [&_.LowerContainer]:p-4 [&_.Title]:text-[16px] [&_.Title]:font-medium [&_.Title]:mt-0 [&_.Title]:mx-0 [&_.Title]:mb-2 [&_.Title]:leading-[1.4] [&_.Description]:text-[12px] [&_.Description]:leading-[1.6] [&_.Description]:block [&_.SiteDetails]:text-[12px] [&_.SiteDetails]:leading-[1.6] [&_.SiteDetails]:block [&_.Image]:[background-size:contain] [&_.Image]:bg-muted"
    />
  );
}
