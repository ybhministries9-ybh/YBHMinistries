module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    // No `project` here on purpose: none of the enabled rules require type
    // information, and dropping it keeps lint fast and avoids "file not found
    // in project" parse errors for scripts/config files outside tsconfig.
  },
  settings: {
    react: { version: 'detect' },
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y', 'react-hooks'],
  rules: {
    // JSX transform is automatic in Next.js / react-jsx
    'react/react-in-jsx-scope': 'off',
    // TypeScript provides prop typing
    'react/prop-types': 'off',
    // `any` is used deliberately in this codebase (API payloads, dynamic DB rows)
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // `<style jsx>` / `<style jsx global>` are valid Next.js styled-jsx props
    'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],
    // Modal dialogs are legitimately focusable containers
    'jsx-a11y/no-noninteractive-tabindex': [
      'error',
      { tags: [], roles: ['tabpanel', 'dialog'], allowExpressionValues: true },
    ],
    // `@ts-ignore` is allowed when it carries an explanation
    '@typescript-eslint/ban-ts-comment': [
      'error',
      { 'ts-ignore': 'allow-with-description', minimumDescriptionLength: 5 },
    ],
  },
  overrides: [
    {
      // Plain JS (build scripts, config files) is not part of the TS project.
      files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
      env: { node: true, es2024: true },
      rules: {
        // These files are CommonJS by design (Node scripts, ESLint config)
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ],
};
