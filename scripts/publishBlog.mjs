import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

const root = path.resolve('src/content/blog');
const file = path.resolve(root, process.argv[2] ?? '');
if (!file.startsWith(root + path.sep) || path.extname(file) !== '.mdx') {
  throw new Error('Pass an MDX path relative to src/content/blog, such as myArticle/index.mdx.');
}

const source = await readFile(file, 'utf8');
const tree = unified().use(remarkParse).use(remarkMdx).parse(source);
const post = tree.children
  .flatMap((node) => node.data?.estree?.body ?? [])
  .filter((node) => node.type === 'ExportNamedDeclaration')
  .flatMap((node) => node.declaration?.declarations ?? [])
  .find((declaration) => declaration.id.name === 'post')?.init;
if (post?.type !== 'ObjectExpression') {
  throw new Error('Expected an exported post object.');
}

const field = (name) =>
  post.properties.find((prop) => (prop.key?.name ?? prop.key?.value) === name);
const draft = field('isDraft');
if (draft?.value.type !== 'Literal' || typeof draft.value.value !== 'boolean') {
  throw new Error('Set isDraft to a boolean literal in the post metadata.');
}
const date = field('date');
const updated = `${source.slice(0, draft.value.start)}false${source.slice(draft.value.end)}`;
const dateProperty = `\n  date: '${new Date().toISOString()}',`;
const stamp = date ? '' : dateProperty;
const published = updated.slice(0, post.start + 1) + stamp + updated.slice(post.start + 1);
if (published !== source) {
  await writeFile(file, published);
}
