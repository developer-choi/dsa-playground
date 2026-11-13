module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'subject-korean': ({ subject }) => {
          const hasKorean = /[\uAC00-\uD7AF]/.test(subject);
          return [hasKorean, '커밋 메시지(subject)에 한글이 포함되어야 합니다 (한글 필수)'];
        },
      },
    },
  ],
  rules: {
    // 커밋 본문 끝의 Backlog trailer는 백로그 항목 경로를 통째로 담아 100자를 넘는다(knowledge-archive와 같은 한도).
    'body-max-line-length': [2, 'always', 200],
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'test']],
    'scope-enum': [
      2,
      'always',
      [
        'problem',
        'docs',
        'data-structure',
        'config',
        'skills',
      ],
    ],
    'scope-empty': [2, 'never'],
    // 한국어 커밋엔 대소문자 개념이 없어 무의미하고, README·TS 같은 정당한 약어/파일명만 막는다. 비활성화.
    'subject-case': [0],
    'subject-korean': [2, 'always'],
  },
};
