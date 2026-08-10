import { dfs } from './wf-4';
import { compareFunctionsWithRandomInputs } from '@/utils/vitest';

const solutions = [
  { name: 'dfs', fn: dfs },
];

describe.each(solutions)('디렉토리 경로 > $name', ({ fn }) => {
  describe('General cases', () => {
    it('루트에서 리프까지 가장 긴 경로의 문자 수를 반환한다', () => {
      expect(fn(7, [[1, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7]], ['root', 'abcd', 'cs', 'hello', 'etc', 'hello', 'solution'])).toBe(16);
      expect(fn(7, [[1, 2], [2, 3], [3, 4], [4, 5], [1, 6], [6, 7]], ['root', 'a', 'b', 'c', 'd', 'efghij', 'k'])).toBe(13);
    });
  });

  describe('Boundary cases', () => {
    it('N=2 최소 디렉토리 구조에서 가장 긴 경로의 문자 수를 반환한다', () => {
      expect(fn(2, [[1, 2]], ['root', 'a'])).toBe(6);
    });
  });

  describe('Edge cases', () => {
    it('일자 사슬 형태의 깊은 트리에서 경로 길이를 정확히 계산한다', () => {
      expect(fn(4, [[1, 2], [2, 3], [3, 4]], ['root', 'a', 'b', 'c'])).toBe(10);
    });
  });

  describe('Random', () => {
    test('랜덤 입력으로 정답과 동일한지 검증한다', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: ([N, relation, dirname]) => fn(N, relation, dirname),
        answerFunction: naiveLongestPath,
        generateInput: randomTree,
        iterationCount: 1000,
      });
    });
  });
});

function randomTree(): [[number, [number, number][], string[]]] {
  const N = Math.floor(Math.random() * 30) + 5;
  const relation: [number, number][] = [];
  for (let i = 2; i <= N; i++) {
    const parent = Math.floor(Math.random() * (i - 1)) + 1;
    relation.push([parent, i]);
  }
  for (let i = relation.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [relation[i], relation[j]] = [relation[j], relation[i]];
  }
  const dirname: string[] = ['root'];
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 2; i <= N; i++) {
    const len = Math.floor(Math.random() * 10) + 1;
    let name = '';
    for (let k = 0; k < len; k++) {
      name += chars[Math.floor(Math.random() * chars.length)];
    }
    dirname.push(name);
  }
  return [[N, relation, dirname]];
}

function naiveLongestPath([N, relation, dirname]: [number, [number, number][], string[]]): number {
  const children: number[][] = Array.from({ length: N + 1 }, () => []);
  for (const [p, c] of relation) children[p].push(c);
  let maxLen = 0;
  const stack: { node: number; len: number }[] = [{ node: 1, len: dirname[0].length }];
  while (stack.length) {
    const { node, len } = stack.pop()!;
    if (len > maxLen) maxLen = len;
    for (const c of children[node]) {
      stack.push({ node: c, len: len + 1 + dirname[c - 1].length });
    }
  }
  return maxLen;
}

