import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Preserve upstream Sites installer helpers; all maintained application code is const-only.
    ignores: ['scripts/pnpm-install.mjs', 'scripts/execution-profile.mjs'],
    rules: {
      'no-var': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: "VariableDeclaration[kind='let']",
          message: 'Use const bindings. Model evolving state explicitly or derive a new value.',
        },
      ],
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    '.sites-runtime/**',
    'next-env.d.ts',
    'src/demos/json-renderer/upstream/**',
    'public/demos/**',
  ]),
  {
    files: ['src/components/ui/**/*.{ts,tsx}', 'src/hooks/use-mobile.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    files: [
      'src/**/*.{ts,tsx}',
      'scripts/{build-demo,sync-renderer,serve-static}.mjs',
      'src/demos/json-renderer/*.tsx',
    ],
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'one-var': ['error', 'never'],
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'no-nested-ternary': 'error',
      'no-else-return': 'error',
      'no-param-reassign': ['error', { props: false }],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    ...prettier,
    ignores: ['src/components/ui/**', 'src/hooks/use-mobile.ts'],
    files: [
      'src/**/*.{ts,tsx}',
      'scripts/{build-demo,sync-renderer,serve-static}.mjs',
      'src/demos/json-renderer/*.tsx',
    ],
  },
  {
    files: [
      'src/app/**/*.{ts,tsx}',
      'src/features/**/*.{ts,tsx}',
      'src/hooks/**/*.ts',
      'src/lib/**/*.ts',
    ],
    rules: { curly: ['error', 'all'] },
  },
]);
