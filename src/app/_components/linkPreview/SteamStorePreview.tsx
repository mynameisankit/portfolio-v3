import { useLocale } from 'next-intl';

const languages: Record<string, string> = {
  en: 'english',
  nl: 'dutch',
  de: 'german',
  sv: 'swedish',
  ja: 'japanese',
};

export function SteamStorePreview({ appId, title }: { appId: string; title?: string }) {
  const locale = useLocale();

  return (
    <iframe
      className="steam-store-widget block w-full h-[190px] border-0"
      src={`https://store.steampowered.com/widget/${appId}/?l=${languages[locale] ?? 'english'}`}
      title={`${title ?? 'Game'} — Steam Store`}
      width={646}
      height={190}
      loading="lazy"
    />
  );
}
