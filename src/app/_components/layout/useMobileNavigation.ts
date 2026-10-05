'use client';

import { useEffect, useState } from 'react';
import { MOBILE_NAVIGATION_MEDIA_QUERY } from '@/config/navigationConfig';

export function useMobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_NAVIGATION_MEDIA_QUERY);
    const closeOnDesktop = () => {
      if (!mediaQuery.matches) {
        setIsOpen(false);
      }
    };

    mediaQuery.addEventListener('change', closeOnDesktop);

    return () => mediaQuery.removeEventListener('change', closeOnDesktop);
  }, []);

  return { isOpen, setIsOpen, closeMenu };
}
