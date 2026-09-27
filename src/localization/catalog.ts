import { sourceKey } from './model';
import translations from './translations.json';

// Exact English matching prevents stale translations after source content changes.
export const catalog = new Map(
  translations.map(({ en, nl, de, sv, ja }) => [sourceKey(en), { nl, de, sv, ja }]),
);
