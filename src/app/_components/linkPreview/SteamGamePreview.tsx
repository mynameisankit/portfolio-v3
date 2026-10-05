'use client';

import type { ReactElement } from 'react';
import { SteamStorePreview } from './SteamStorePreview';
import * as HoverCard from '@radix-ui/react-hover-card';

export function SteamGamePreview({
  appId,
  children,
  title,
}: {
  appId: number;
  children: ReactElement;
  title: string;
}) {
  return (
    <HoverCard.Root openDelay={300} closeDelay={120}>
      <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="steam-store-popover z-100 w-[min(646px,calc(100vw-32px))] overflow-hidden rounded-[10px] bg-card text-foreground shadow-[0_16px_48px_#0005]"
          sideOffset={10}
          collisionPadding={16}
          align="start"
        >
          <SteamStorePreview appId={String(appId)} title={title} />
          <HoverCard.Arrow className="fill-border" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
