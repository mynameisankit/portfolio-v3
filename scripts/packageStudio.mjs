import { cp, readFile, rename, writeFile } from 'node:fs/promises';

await cp('studio-dist', 'out/studio', { recursive: true });
// Keep assets outside the Studio route fallback so Cloudflare serves their real content.
await rename('out/studio/static', 'out/studioAssets');
const file = 'out/studio/index.html';
const html = (await readFile(file, 'utf8'))
  .replace(/<link[^>]*rel="(?:manifest|apple-touch-icon)"[^>]*>/g, '')
  .replaceAll('/studio/static/', '/studioAssets/')
  .replaceAll('href="/static/', 'href="/studioAssets/');
const head =
  '<meta name="theme-color" content="#121510"><link rel="manifest" href="/editor.webmanifest"><link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">';
await writeFile(file, html.replace('</head>', `${head}</head>`));
