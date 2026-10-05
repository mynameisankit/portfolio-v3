'use client';

import { useEffect } from 'react';
import { observeNavigationSections } from './activeNavigation.utils';

export function useSectionNavigation(
  shouldObserveSections: boolean,
  onActiveItemChange: (item: string) => void,
) {
  useEffect(() => {
    if (!shouldObserveSections) {
      return;
    }

    return observeNavigationSections(onActiveItemChange);
  }, [onActiveItemChange, shouldObserveSections]);
}
