import reactConfig from '@rtds/eslint-config/react';

export default [
  ...reactConfig,
  {
    ignores: ['dist/**'],
  },
];
