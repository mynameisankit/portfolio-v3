import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const sha = process.argv[2];
if (!/^[a-f0-9]{40}$/.test(sha ?? ''))
  throw new Error('Provide a reviewed full commit SHA: yarn demo:sync <40-character SHA>');
const repository = 'mynameisankit/react-json-renderer';
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'ankit-portfolio-sync' };
async function get(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`GitHub request failed: ${response.status}`);
  return response;
}
const tree = await (
  await get(`https://api.github.com/repos/${repository}/git/trees/${sha}?recursive=1`)
).json();
if (tree.truncated) throw new Error('Source tree is truncated; refusing incomplete sync.');
const files = tree.tree.filter((item) => item.type === 'blob' && item.path.startsWith('src/'));
if (!files.length) throw new Error('No source files found.');
const staged = [];
for (const file of files) {
  const relative = file.path.slice(4);
  if (relative.split('/').some((part) => part === '..' || part === '.'))
    throw new Error('Unexpected path');
  const response = await get(`https://raw.githubusercontent.com/${repository}/${sha}/${file.path}`);
  staged.push([relative, await response.text()]);
}
const destination = path.join(root, 'src/demos/json-renderer/upstream');
if (!destination.startsWith(root) || path.basename(destination) !== 'upstream')
  throw new Error('Invalid source destination');
await rm(destination, { recursive: true, force: true });
for (const [relative, source] of staged) {
  const target = path.join(destination, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, source);
}
const metadata = JSON.parse(
  await readFile(path.join(root, 'src/demos/json-renderer/source.json'), 'utf8'),
);
metadata.commit = sha;
await writeFile(
  path.join(root, 'src/demos/json-renderer/source.json'),
  `${JSON.stringify(metadata, null, 2)}\n`,
);
console.log(`Updated renderer source to ${sha}. Rebuild and review before deploying.`);
