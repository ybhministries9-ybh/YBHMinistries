module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: ['./tsconfig.json'],
  },
  settings: {
    react: { version: 'detect' },
  },
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y'],
  rules: {
    // allow jsx in .tsx only
    'react/react-in-jsx-scope': 'off',
    // tuning
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'react/prop-types': 'off'
  }
};
