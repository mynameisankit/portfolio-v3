import { isLocale, type Locale } from './model';
const eventName = 'portfolio-language';
export function getLocaleSnapshot(): Locale {
  const query = new URLSearchParams(window.location.search).get('lang');
  if (isLocale(query)) {
    return query;
  }
  try {
    const saved = localStorage.getItem('portfolio-language');
    return isLocale(saved) ? saved : 'en';
  } catch {
    return 'en';
  }
}
export function subscribeLocale(callback: () => void) {
  window.addEventListener(eventName, callback);
  window.addEventListener('popstate', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener('popstate', callback);
    window.removeEventListener('storage', callback);
  };
}
export function changeLocale(locale: Locale) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', locale);
  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  try {
    localStorage.setItem('portfolio-language', locale);
  } catch {
    /* The URL retains the selection when storage is unavailable. */
  }
  window.dispatchEvent(new Event(eventName));
}
