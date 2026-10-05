'use client';

import { useLayoutEffect, useRef } from 'react';
import { CAREER_STICKY_MINIMUM_INSET_PX } from '@/config/experienceConfig';

export function useCenteredCareer() {
  const careerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const career = careerRef.current;
    if (!career) {
      return;
    }
    const updatePosition = () => {
      const centeredInset = (window.innerHeight - career.getBoundingClientRect().height) / 2;
      const inset = Math.max(CAREER_STICKY_MINIMUM_INSET_PX, centeredInset);

      career.style.setProperty('--career-sticky-top', `${inset}px`);
    };
    const observer = new ResizeObserver(updatePosition);

    observer.observe(career);
    window.addEventListener('resize', updatePosition);
    updatePosition();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  return careerRef;
}
