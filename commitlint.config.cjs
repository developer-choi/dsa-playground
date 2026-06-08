module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'test']],
    'scope-enum': [
      2,
      'always',
      [
        'problem',
        'docs',
        'data-structure',
        'config',
        'skill',
      ],
    ],
    'scope-empty': [2, 'never'],
  },
};
