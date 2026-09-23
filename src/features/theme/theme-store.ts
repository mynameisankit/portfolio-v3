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
export function toggleTheme() {
  const next = getSnapshot() ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem('portfolio-theme', next);
  } catch {
    /* Theme still works without persistence. */
  }
  window.dispatchEvent(new Event('portfolio-theme-change'));
}
