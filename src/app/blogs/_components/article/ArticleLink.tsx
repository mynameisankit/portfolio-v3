import type { ComponentProps } from 'react';
import { ConditionalRenderer } from '@/app/_components/ui/ConditionalRenderer';
import { ExternalLinkIndicator } from '@/app/_components/ui/ExternalLinkIndicator';
import { siteConfig } from '@/config/siteConfig';

export function ArticleLink({ href, children, ...props }: ComponentProps<'a'>) {
  const url = href && URL.parse(href, siteConfig.url);
  if (!url || !['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)) {
    return <>{children}</>;
  }
  const isExternal =
    ['http:', 'https:'].includes(url.protocol) && url.origin !== new URL(siteConfig.url).origin;

  return (
    <a href={href} {...props}>
      {children}
      <ConditionalRenderer shouldRender={isExternal}>
        {' '}
        <ExternalLinkIndicator />
      </ConditionalRenderer>
    </a>
  );
}
