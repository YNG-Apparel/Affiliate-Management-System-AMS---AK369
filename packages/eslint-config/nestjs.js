import base from './base.js';

export default [
  ...base,
  {
    rules: {
      '@typescript-eslint/no-empty-function': ['warn', { allow: ['constructors'] }],
    },
  },
];
