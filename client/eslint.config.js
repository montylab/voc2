import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'indent': ['error', 'tab'],
      'semi': ['error', 'never'],
      'quotes': ['error', 'single', { allowTemplateLiterals: true }],
      'jsx-quotes': ['error', 'prefer-double'],
      'max-len': ['error', { code: 100, tabWidth: 4, ignoreStrings: true, ignoreTemplateLiterals: true }],
    },
  },
])
