'use client';

import './link-preview.css';

import * as HoverCard from '@radix-ui/react-hover-card';
import type { ReactElement } from 'react';

import { PreviewCard } from './preview-card';
import type { PreviewData } from './preview-data';
import { SteamStorePreview } from './steam-store-preview';

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
          className={`link-preview-popover${appId ? ' steam-store-popover' : ''}`}
          sideOffset={10}
          collisionPadding={16}
          align="start"
        >
          {appId ? (
            <SteamStorePreview appId={appId} title={preview?.title} />
          ) : (
            <div className="link-preview-display" inert>
              <PreviewCard href={href} preview={preview} />
            </div>
          )}
          <HoverCard.Arrow className="link-preview-arrow" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
