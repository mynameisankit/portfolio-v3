'use client';

import { useState } from 'react';
import { getActiveRouteItem } from './activeNavigation';
import { useSectionNavigation } from './useSectionNavigation';

export function useActiveNavigation() {
  const [activeItem, setActiveItem] = useState(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    return getActiveRouteItem(window.location.pathname);
  });
  const shouldObserveSections =
    typeof window !== 'undefined' && getActiveRouteItem(window.location.pathname) === '';

  useSectionNavigation(shouldObserveSections, setActiveItem);

  return activeItem;
}
