'use client';

import { useEffect, useState } from 'react';
import { CAREER_SECTION_ACTIVATION_RATIO } from '@/config/experienceConfig';
import { getActiveCareerSection } from './careerNavigation.utils';

export function useActiveCareerSection(sectionIds: readonly string[]) {
  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const frame = { id: null as number | null };

    const updateActiveSection = () => {
      frame.id = null;
      const positions = sections.map((section) => ({
        id: section.id,
        top: section.getBoundingClientRect().top,
      }));

      setActiveSectionId(
        getActiveCareerSection(positions, window.innerHeight * CAREER_SECTION_ACTIVATION_RATIO),
      );
    };
    const scheduleUpdate = () => (frame.id ??= window.requestAnimationFrame(updateActiveSection));

    const resizeObserver = new ResizeObserver(scheduleUpdate);

    sections.forEach((section) => resizeObserver.observe(section));
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      resizeObserver.disconnect();
      if (frame.id !== null) {
        window.cancelAnimationFrame(frame.id);
      }
    };
  }, [sectionIds]);

  return activeSectionId;
}
