import { flushSync } from 'react-dom';

export function getSnapshot() {
  return document.documentElement.dataset.theme === 'light';
}
export function subscribe(onChange: () => void) {
  const restore = () => {
    try {
      document.documentElement.dataset.theme =
        localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark';
    } catch {
      /* Keep the current theme when browser storage is unavailable. */
    }
    onChange();
  };

  restore();
  window.addEventListener('storage', restore);
  window.addEventListener('portfolio-theme-change', onChange);

  return () => {
    window.removeEventListener('storage', restore);
    window.removeEventListener('portfolio-theme-change', onChange);
  };
}

function updateTheme() {
  const next = getSnapshot() ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem('portfolio-theme', next);
  } catch {
    /* Theme still works without persistence. */
  }

  window.dispatchEvent(new Event('portfolio-theme-change'));
}

export function toggleTheme() {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (shouldReduceMotion || typeof document.startViewTransition !== 'function') {
    updateTheme();

    return;
  }

  // Capture the entire page, including canvas artwork, as one coordinated crossfade.
  const transition = document.startViewTransition(() => flushSync(updateTheme));
  void transition.ready.catch(() => {
    // A skipped animation (for example, in a hidden tab) still applies the theme.
  });
}
