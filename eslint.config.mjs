import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      prettier,
    },
    rules: {
      'arrow-parens': ['error', 'as-needed'],
      'max-len': ['error', { code: 120 }],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-trailing-spaces': 'error',
      'prefer-const': 'error',
      'object-shorthand': 'error',
      'prettier/prettier': 'error',
    },
  },
];

export default eslintConfig;
