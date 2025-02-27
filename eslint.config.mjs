import { FlatCompat } from '@eslint/eslintrc';
const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});
const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:unicorn/recommended',
      'plugin:import/recommended',
      'plugin:prettier/recommended',
    ],
    plugins: ['simple-import-sort'],
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            e2e: true,
          },
          replacements: {
            props: false,
            ref: false,
            params: false,
          },
        },
      ],
    },
  }),
];
export default eslintConfig;
