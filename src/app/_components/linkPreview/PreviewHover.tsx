'use client';
import type { ReactElement } from 'react';
import { PreviewCard } from './PreviewCard';
import type { PreviewData } from './previewData';
import { SteamStorePreview } from './SteamStorePreview';
import * as HoverCard from '@radix-ui/react-hover-card';

export function PreviewHover({
  children,
  href,
  preview,
}: {
  children: ReactElement;
  href: string;
  preview?: PreviewData;
}) {
  if (!/^(https?:\/\/|\/|#)/i.test(href)) {
    return children;
  }
  const appId = href.match(/^https:\/\/store\.steampowered\.com\/app\/(\d+)(?:\/|$)/i)?.[1];

  return (
    <HoverCard.Root openDelay={300} closeDelay={120}>
      <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className={`link-preview-popover z-100 [width:min(320px,_calc(100vw_-_32px))] text-foreground bg-card rounded-[10px] shadow-[0_16px_48px_#0005]${appId ? ' steam-store-popover [width:min(646px,_calc(100vw_-_32px))] overflow-hidden' : ''}`}
          sideOffset={10}
          collisionPadding={16}
          align="start"
        >
          {!!appId && <SteamStorePreview appId={appId} title={preview?.title} />}
          {!appId && (
            <div className="link-preview-display [pointer-events:none]" inert>
              <PreviewCard href={href} preview={preview} />
            </div>
          )}
          <HoverCard.Arrow className="link-preview-arrow [fill:var(--border)]" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
