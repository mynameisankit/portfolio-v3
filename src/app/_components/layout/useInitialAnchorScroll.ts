'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { scrollToCurrentAnchor } from './anchorNavigation.utils';

export function useInitialAnchorScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const frame = { id: null as number | null };
    const scheduleScroll = () => {
      if (frame.id !== null) {
        window.cancelAnimationFrame(frame.id);
      }
      frame.id = window.requestAnimationFrame(() => {
        frame.id = window.requestAnimationFrame(() => {
          frame.id = null;
          if (scrollToCurrentAnchor()) {
            observer.disconnect();
          }
        });
      });
    };
    const observer = new MutationObserver(scheduleScroll);
    const beginAnchorScroll = () => {
      observer.disconnect();
      if (window.location.hash) {
        // A route may commit before its section is rendered or a closing menu unlocks scrolling.
        observer.observe(document.body, { childList: true, subtree: true });
        scheduleScroll();
      }
    };

    if (document.readyState === 'complete') {
      beginAnchorScroll();
    } else {
      window.addEventListener('load', beginAnchorScroll, { once: true });
    }
    window.addEventListener('hashchange', beginAnchorScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('load', beginAnchorScroll);
      window.removeEventListener('hashchange', beginAnchorScroll);
      if (frame.id !== null) {
        window.cancelAnimationFrame(frame.id);
      }
    };
  }, [pathname]);
}
