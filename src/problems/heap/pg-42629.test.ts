import { recursive } from './pg-42629';

const solutions = [
  {name: 'recursive', fn: recursive},
];

describe.each(solutions)('라면공장 > $name', ({fn}) => {
  describe('General cases', () => {
    it('최소 공급 횟수를 반환한다', () => {
      expect(fn(4, [4, 10, 15], [20, 5, 10], 30)).toBe(2);
    });
  });

  describe('Boundary cases', () => {
    it('stock이 k 이상이면 긴 공급 배열에서도 공급 없이 0을 반환한다', () => {
      const dates = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      const supplies = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      expect(fn(100000000, dates, supplies, 1)).toBe(0);
    });

    it('stock이 k 이상이면 단일 공급에서도 공급 없이 0을 반환한다', () => {
      expect(fn(100000000, [1], [1], 1)).toBe(0);
    });
  });

  describe('Edge cases', () => {
    it('해외보급이 빈 배열이어도 stock이 k 이상이면 0을 반환한다', () => {
      expect(fn(100000000, [], [], 1)).toBe(0);
    });
  });
});
