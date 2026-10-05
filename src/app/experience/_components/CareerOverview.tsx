'use client';

import { Text } from '@/app/_components/localization/Text';
import type { CareerEntry } from '@/data/experience/model';
import { getCareerSectionId } from './careerNavigation.utils';
import { CareerNavigationItem } from './CareerNavigationItem';
import { useActiveCareerSection } from './useActiveCareerSection';
import { useCenteredCareer } from './useCenteredCareer';

export function CareerOverview({
  career,
  heading,
  sectionIds,
}: {
  career: readonly CareerEntry[];
  heading: string;
  sectionIds: readonly string[];
}) {
  const activeSectionId = useActiveCareerSection(sectionIds);
  const careerRef = useCenteredCareer();

  if (!career.length) {
    return null;
  }

  return (
    <aside
      ref={careerRef}
      aria-labelledby="career-overview-title"
      className="self-start min-[1280px]:sticky min-[1280px]:[top:var(--career-sticky-top,2rem)] [@media(max-height:650px)]:static"
    >
      <h2 id="career-overview-title" className="mb-6 text-2xl font-medium tracking-tight">
        <Text>{heading}</Text>
      </h2>
      <ol aria-labelledby="career-overview-title" className="pl-3">
        {career.map((entry) => {
          const sectionId = getCareerSectionId(entry, sectionIds);

          return (
            <li
              key={entry.id}
              className="relative border-l border-border pb-6 pl-4 last:border-transparent last:pb-0"
            >
              <CareerNavigationItem
                entry={entry}
                sectionId={sectionId}
                isActive={sectionId === activeSectionId}
              />
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
