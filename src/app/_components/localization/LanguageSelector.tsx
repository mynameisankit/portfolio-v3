'use client';
import { useLocale } from 'next-intl';
import { isLocale, languageNames, locales } from '@/localization/model';
import { changeLocale } from './localeStore';
import { useCopy } from './useCopy';

export function LanguageSelector() {
  const locale = useLocale();
  const copy = useCopy();

  return (
    <label className="language-selector">
      <span className="sr-only">{copy('Language')}</span>
      <select
        className="max-w-[125px] p-2 text-foreground bg-background border border-border rounded-[5px] [font:inherit] cursor-pointer focus-visible:[outline:2px_solid_var(--primary)] focus-visible:[outline-offset:3px]"
        value={locale}
        onChange={(event) => {
          if (isLocale(event.target.value)) {
            changeLocale(event.target.value);
          }
        }}
      >
        {locales.map((language) => (
          <option key={language} value={language} lang={language}>
            {languageNames[language]}
          </option>
        ))}
      </select>
    </label>
  );
}
