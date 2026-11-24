import { flushSync } from 'react-dom';

const nextTheme = { dark: 'light', light: 'vice', vice: 'dark' } as const;

function parseTheme(value: string | null | undefined): keyof typeof nextTheme {
  return value === 'light' || value === 'vice' ? value : 'dark';
}

export function getSnapshot() {
  return parseTheme(document.documentElement.dataset.theme);
}
export function subscribe(onChange: () => void) {
  const restore = () => {
    try {
      document.documentElement.dataset.theme = parseTheme(localStorage.getItem('portfolio-theme'));
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
  const next = nextTheme[getSnapshot()];
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
