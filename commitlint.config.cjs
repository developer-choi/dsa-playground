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
    // 한국어 커밋엔 대소문자 개념이 없어 무의미하고, README·TS 같은 정당한 약어/파일명만 막는다. 비활성화.
    'subject-case': [0],
  },
};
