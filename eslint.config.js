import js from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import * as react from 'react';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      "react-hooks/exhaustive-deps": "off",
      "react-refresh/only-export-components": "off",
      "no-console": "off",
      "no-undef": "error",

      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': false,
          'ts-nocheck': true,
          'ts-check': true,
          'ts-expect-error': true
        }
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': 'off',
    },
  },
);
