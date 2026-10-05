import { CAREER_COMPANY_SECTIONS } from '@/config/experienceConfig';
import type { CareerEntry } from '@/data/experience/model';

export function getCareerSectionId(entry: CareerEntry, sectionIds: readonly string[]) {
  const organization = entry.organization.toLowerCase();
  const match = CAREER_COMPANY_SECTIONS.find(
    (section) =>
      sectionIds.includes(section.sectionId) &&
      (entry.id === section.company || organization.includes(section.company)),
  );

  return match?.sectionId;
}

export function getActiveCareerSection(
  sections: readonly { id: string; top: number }[],
  activationLine: number,
) {
  const enteredSections = sections.filter((section) => section.top <= activationLine);

  return enteredSections.at(-1)?.id ?? sections[0]?.id ?? '';
}
