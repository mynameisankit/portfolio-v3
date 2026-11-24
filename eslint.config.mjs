import projectRules from './scripts/eslintRules.mjs';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { project: projectRules },
    rules: {
      'project/file-boundaries': 'error',
      'project/conditional-component-renderer': 'error',
      'project/constant-names': 'error',
      'project/simple-ternary': 'error',
      'project/tailwind-styles': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['function', 'export'], next: '*' },
        { blankLine: 'any', prev: 'export', next: 'export' },
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'never', prev: 'import', next: 'import' },
      ],
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    },
  },

  {
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'property', format: null },
        { selector: 'enumMember', format: ['PascalCase'] },
      ],
    },
  },
  {
    rules: {
      'no-var': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector:
            ":matches(FunctionDeclaration[id.name=/^(?:[A-Z]|use[A-Z])/], FunctionExpression[id.name=/^(?:[A-Z]|use[A-Z])/], VariableDeclarator[id.name=/^(?:[A-Z]|use[A-Z])/] > :matches(ArrowFunctionExpression, FunctionExpression)) Literal[value!=0][value!=1][value=type(number)]:not(TSLiteralType > Literal)",
          message: 'Extract numeric settings into named module-level constants.',
        },
        {
          selector:
            ":matches(CallExpression[callee.name='useState'], CallExpression[callee.property.name='useState']) > Literal[value=0], :matches(CallExpression[callee.name='useState'], CallExpression[callee.property.name='useState']) > Literal[value=1]",
          message: 'Give numeric initial state a named module-level constant.',
        },
        {
          selector: "VariableDeclaration[kind='let']",
          message: 'Use const bindings. Model evolving state explicitly or derive a new value.',
        },
      ],
    },
  },
  globalIgnores([
    '.next/**',
    '.wrangler/**',
    'out/**',
    'studio-dist/**',
    'dist/**',
    '.sites-runtime/**',
    'next-env.d.ts',
  ]),
  {
    // Next.js requires this exact filename and export for MDX component mapping.
    files: ['src/mdx-components.tsx', 'src/data/blog/mdx.d.ts'],
    rules: { 'project/file-boundaries': 'off' },
  },
  {
    files: ['src/app/_components/ui/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx,mjs}'],
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
      'simple-import-sort/imports': [
        'error',
        { groups: [['^\u0000', '^node:', '^react', '^next', '^@?\w', '^@/', '^\.']] },
      ],
      'simple-import-sort/exports': 'error',
      'import/newline-after-import': [
        'error',
        { count: 1, exactCount: true, considerComments: true },
      ],
    },
  },
  {
    ...prettier,
    ignores: ['src/app/_components/ui/**'],
    files: ['src/**/*.{ts,tsx}', 'scripts/*.mjs'],
  },
  {
    files: ['src/app/**/*.{ts,tsx}', 'src/data/**/*.{ts,tsx}', 'src/lib/**/*.{ts,tsx}'],
    rules: {
      curly: ['error', 'all'],
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'property', format: null },
        { selector: 'enumMember', format: ['PascalCase'] },
        {
          selector: ['variable', 'parameter', 'typeProperty'],
          filter: { regex: '^(dynamicParams|asChild|current)$', match: true },
          format: ['camelCase'],
        },
        {
          selector: ['variable', 'parameter', 'typeProperty'],
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'has', 'should', 'can', 'did', 'will', 'was', 'does', 'needs'],
        },
      ],
    },
  },
]);
