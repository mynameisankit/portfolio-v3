import { cp, readFile, writeFile } from 'node:fs/promises';

await cp('studio-dist', 'out/studio', { recursive: true });
const file = 'out/studio/index.html';
const html = (await readFile(file, 'utf8')).replace(
  /<link[^>]*rel="(?:manifest|apple-touch-icon)"[^>]*>/g,
  '',
);
const head =
  '<meta name="theme-color" content="#121510"><link rel="manifest" href="/editor.webmanifest"><link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">';
await writeFile(file, html.replace('</head>', `${head}</head>`));
