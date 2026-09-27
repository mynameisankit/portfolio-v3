export const locales = ['en', 'nl', 'de', 'sv', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const languageNames: Record<Locale, string> = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  sv: 'Svenska',
  ja: '日本語',
};
export function isLocale(value: string | null): value is Locale {
  return locales.some((locale) => locale === value);
}
export function sourceKey(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}
