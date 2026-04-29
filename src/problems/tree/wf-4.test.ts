import { dfs } from './wf-4';

const solutions = [
  { name: 'dfs', fn: dfs },
];

describe.each(solutions)('디렉토리 경로 > $name', ({ fn }) => {
  describe('General cases', () => {
    it('루트에서 리프까지 가장 긴 경로의 문자 수를 반환한다', () => {
      expect(fn(7, [[1,2],[2,5],[1,6],[2,3],[3,7],[3,4]], ['root','abcd','cs','hello','etc','hello','solution'])).toBe(21);
      expect(fn(7, [[1,2],[2,3],[3,4],[4,5],[1,6],[6,7]], ['root','a','b','c','d','efghij','k'])).toBe(13);
    });
  });

  describe('Boundary cases', () => {
  });

  describe('Edge cases', () => {
  });
});
