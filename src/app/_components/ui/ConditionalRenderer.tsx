import type { ReactNode } from 'react';

export function ConditionalRenderer({
  children,
  shouldRender,
}: {
  children: ReactNode;
  shouldRender: boolean;
}) {
  if (!shouldRender) {
    return null;
  }

  return children;
}
