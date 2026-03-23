module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'test']],
    'scope-enum': [
      2,
      'always',
      [
        // problems/
        'implementation',
        'greedy',
        'dynamic-programming',
        'binary-search',
        'dfs-bfs',
        'backtracking',
        'shortest-path',
        'sort',
        'two-pointer',
        'sliding-window',
        'stack-queue',
        'heap',
        'hash',
        'tree',
        'graph',
        'string',
        'math',
        // docs/
        'docs',
        // data-structure/
        'data-structure',
        // config
        'config',
        // skills
        'skill',
      ],
    ],
    'scope-empty': [2, 'never'],
  },
};
