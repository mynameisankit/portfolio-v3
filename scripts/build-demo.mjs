import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { build } from '../src/demos/json-renderer/node_modules/esbuild/lib/main.js';
const root = fileURLToPath(new URL('../', import.meta.url));
const demo = path.join(root, 'src/demos/json-renderer');
const output = path.join(root, 'public/demos/json-renderer');
await mkdir(output, { recursive: true });
await build({
  absWorkingDir: demo,
  entryPoints: ['main.tsx'],
  bundle: true,
  outfile: path.join(output, 'demo.js'),
  format: 'esm',
  platform: 'browser',
  jsx: 'automatic',
  minify: true,
  alias: { '@': path.join(demo, 'upstream') },
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'info',
});
await copyFile(path.join(demo, 'index.html'), path.join(output, 'index.html'));
