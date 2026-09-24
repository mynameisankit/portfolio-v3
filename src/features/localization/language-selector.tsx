'use client';
import './localization.css';

import { useLocale } from 'next-intl';

import { changeLocale } from './locale-store';
import { isLocale, languageNames, locales } from './model';
import { useCopy } from './text';

export function LanguageSelector() {
  const locale = useLocale();
  const copy = useCopy();
  return (
    <label className="language-selector">
      <span className="sr-only">{copy('Language')}</span>
      <select
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
