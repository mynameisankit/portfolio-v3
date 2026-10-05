export function getAnchorId(hash: string) {
  const fragment = hash.replace(/^#/, '');
  try {
    return decodeURIComponent(fragment);
  } catch {
    return fragment;
  }
}

export function scrollToCurrentAnchor() {
  const anchorId = getAnchorId(window.location.hash);
  if (!anchorId) {
    return false;
  }
  const target = document.getElementById(anchorId);
  if (!target || document.querySelector('[role="dialog"][data-state]')) {
    return false;
  }
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  target.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'start' });

  return true;
}
