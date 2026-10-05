'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { getActiveRouteItem } from './activeNavigation.utils';
import { useSectionNavigation } from './useSectionNavigation';

export function useActiveNavigation() {
  const pathname = usePathname();
  const activeRouteItem = getActiveRouteItem(pathname);
  const [activeSectionItem, setActiveSectionItem] = useState('');
  const shouldObserveSections = activeRouteItem === '';

  useSectionNavigation(shouldObserveSections, setActiveSectionItem);

  return shouldObserveSections ? activeSectionItem : activeRouteItem;
}
