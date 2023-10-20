/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ["sznm/react", "plugin:react/jsx-runtime"],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-extraneous-dependencies': 'off',
    'no-plusplus': 'off',
    'prefer-destructuring': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'func-names': 'off',
  },
};
