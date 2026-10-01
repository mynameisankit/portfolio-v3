const SECTION_IDS = ['projects', 'experience', 'skills'];
const SECTION_ENTRY_THRESHOLD = 0.1;
const SECTION_DOMINANT_THRESHOLD = 0.4;
const SECTION_FULLY_VISIBLE_THRESHOLD = 0.7;
const NAVIGATION_SECTION_OBSERVER_OPTIONS = {
  rootMargin: '-25% 0px -55%',
  threshold: [SECTION_ENTRY_THRESHOLD, SECTION_DOMINANT_THRESHOLD, SECTION_FULLY_VISIBLE_THRESHOLD],
};

export function getActiveRouteItem(pathname: string) {
  const normalizedPathname = pathname.replace(/\/$/, '');
  const routePathname = normalizedPathname === '' ? '/' : normalizedPathname;

  return routePathname === '/blogs' || routePathname === '/hobbies' ? routePathname.slice(1) : '';
}

export function getNavigationSections() {
  return SECTION_IDS.map((sectionId) => document.getElementById(sectionId)).filter(
    (section): section is HTMLElement => section !== null,
  );
}

export function observeNavigationSections(onActiveItemChange: (item: string) => void) {
  const observer = new IntersectionObserver((entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort(
        (firstEntry, secondEntry) => secondEntry.intersectionRatio - firstEntry.intersectionRatio,
      )[0];
    if (visibleEntry) {
      onActiveItemChange(visibleEntry.target.id);
    }
  }, NAVIGATION_SECTION_OBSERVER_OPTIONS);
  getNavigationSections().forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}
