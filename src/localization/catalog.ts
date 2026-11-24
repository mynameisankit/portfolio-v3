import { sourceKey } from './model';
import translations from './translations.json';

// Exact English matching prevents stale translations after source content changes.
export const catalog = new Map(
  translations.map(({ en, nl, de, sv, ja }) => [sourceKey(en), { nl, de, sv, ja }]),
);

// The published hero omits the final periods used in the bundled portfolio copy.
for (const headline of [
  'I build web interfaces.',
  'Web interfaces, frontend infrastructure, and a few things outside work.',
]) {
  const translation = catalog.get(headline);
  if (translation) catalog.set(headline.slice(0, -1), translation);
}
