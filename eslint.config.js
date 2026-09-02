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
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    // graphql-codegen output (`pnpm lok`), regenerated wholesale from the Lok
    // schema — hand-edits here are overwritten on the next run. The emitted code
    // uses `any` for custom scalars and `@ts-nocheck`-style pragmas, so those two
    // rules are exempted; everything else (e.g. unused vars, which
    // scripts/prune-generated-imports.mjs cleans up) still applies.
    files: ['src/**/*.generated.ts', 'src/api/types.ts', 'src/api/fragments.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
])
