import { readFileSync } from 'node:fs';
import path from 'node:path';
import { isSimpleTernaryBranch } from './isSimpleTernaryBranch.mjs';
import postcss from 'postcss';

const camelCase = /^[a-z][a-zA-Z0-9]*$/;
const pascalCase = /^[A-Z][a-zA-Z0-9]*$/;
const kindOf = (name) => {
  if (/^use[A-Z]/.test(name)) {
    return 'hook';
  }

  if (pascalCase.test(name)) {
    return 'component';
  }

  return 'helper';
};

const projectRules = {
  rules: {
    'simple-ternary': {
      meta: {
        type: 'suggestion',
        schema: [],
        messages: {
          complex:
            'Ternary branches must be literals, references, or simple calls with simple arguments. Move complex branches into an if statement or a focused helper/component.',
        },
      },
      create(context) {
        return {
          ConditionalExpression(node) {
            if (!isSimpleTernaryBranch(node.consequent) || !isSimpleTernaryBranch(node.alternate)) {
              context.report({ node, messageId: 'complex' });
            }
          },
        };
      },
    },
    'file-boundaries': {
      meta: { type: 'suggestion', schema: [], messages: { invalid: '{{detail}}' } },
      create(context) {
        return {
          Program(node) {
            const file = path.relative(process.cwd(), context.filename).replaceAll('\\', '/');
            if (!/^(src|scripts)\//.test(file)) {
              return;
            }
            const isAppFile = file.startsWith('src/app/');
            const isPrivateComponent = isAppFile && file.includes('/_components/');
            const isRoute =
              isAppFile &&
              !isPrivateComponent &&
              /^(page|layout|loading|error|not-found|template|default|global-error|route|manifest|sitemap|robots)\.[^.]+$/.test(
                path.basename(file),
              );
            const stem = path.basename(file, path.extname(file));
            const isComponent = file.endsWith('.tsx') && !isRoute;
            if (!isRoute && !(isComponent ? pascalCase : camelCase).test(stem)) {
              context.report({
                node,
                messageId: 'invalid',
                data: {
                  detail:
                    'Use PascalCase component filenames and camelCase for other source filenames.',
                },
              });
            }
            const folders = file.split('/').slice(0, -1);
            const privateFolders = folders.slice(folders.indexOf('_components') + 1);
            const sourceFolders = isAppFile ? privateFolders : folders;
            if (
              (!isAppFile || isPrivateComponent) &&
              sourceFolders.some((part) => !camelCase.test(part))
            ) {
              context.report({
                node,
                messageId: 'invalid',
                data: {
                  detail:
                    'Source folders must use camelCase; route components belong in _components.',
                },
              });
            }
            if (isComponent && !isPrivateComponent) {
              context.report({
                node,
                messageId: 'invalid',
                data: { detail: 'Colocate components in the owning route’s _components folder.' },
              });
            }
            const functions = node.body.flatMap((statement) => {
              const declaration = statement.declaration ?? statement;
              if (declaration.type === 'FunctionDeclaration' && declaration.id) {
                if (
                  isRoute &&
                  ['generateMetadata', 'generateStaticParams', 'generateViewport'].includes(
                    declaration.id.name,
                  )
                ) {
                  return [];
                }

                return [kindOf(declaration.id.name)];
              }
              if (declaration.type === 'VariableDeclaration') {
                return declaration.declarations
                  .filter(
                    (item) =>
                      item.id.type === 'Identifier' &&
                      ['ArrowFunctionExpression', 'FunctionExpression'].includes(item.init?.type),
                  )
                  .map((item) => kindOf(item.id.name));
              }

              return [];
            });
            if (new Set(functions).size > 1) {
              context.report({
                node,
                messageId: 'invalid',
                data: {
                  detail: 'Keep top-level components, hooks, and helpers in separate files.',
                },
              });
            }
            if (functions.includes('hook') && !/^use[A-Z]/.test(stem)) {
              context.report({
                node,
                messageId: 'invalid',
                data: { detail: 'Hook files must start with use followed by PascalCase.' },
              });
            }
          },
        };
      },
    },
    'tailwind-styles': {
      meta: { type: 'suggestion', schema: [], messages: { raw: '{{detail}}' } },
      create(context) {
        return {
          ImportDeclaration(node) {
            const source = node.source.value;
            if (!source.startsWith('.') || !source.endsWith('.css')) {
              return;
            }
            const file = path.resolve(path.dirname(context.filename), source);
            const css = postcss.parse(readFileSync(file, 'utf8'));
            css.walkAtRules('apply', (rule) => {
              context.report({
                node,
                messageId: 'raw',
                data: {
                  detail: `Put Tailwind utilities in JSX className instead of @apply (${path.basename(file)}:${rule.source.start.line}).`,
                },
              });
            });
            css.walkRules((rule) => {
              const isKeyframe =
                rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name);
              const isGlobalBase =
                path.relative(process.cwd(), file).replaceAll('\\', '/') ===
                  'src/app/globals.css' && !rule.selector.includes('.');
              if (!isKeyframe && !isGlobalBase) {
                context.report({
                  node,
                  messageId: 'raw',
                  data: {
                    detail:
                      'Component styling belongs in JSX Tailwind utilities. CSS is reserved for global base styles, theme tokens, and keyframes.',
                  },
                });
              }
            });
          },
        };
      },
    },
  },
};

export default projectRules;
