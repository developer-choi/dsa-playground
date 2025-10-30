import {duplicateWithinUsingBruteForce, duplicateWithinUsingSlidingWindow} from '@/data-structure/array/duplicate-within';

const algorithms = [
  {name: 'Brute Force', fn: duplicateWithinUsingBruteForce},
  {name: 'Sliding Window', fn: duplicateWithinUsingSlidingWindow},
];

// yarn test src/data-structure/array/duplicate-within.test.ts
describe.each(algorithms)('Duplicate within k distance algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    it('distance 내에 중복이 있는 경우 true를 반환해야 한다', () => {
      expect(fn([1, 2, 3, 1, 4, 5], 3)).toBe(true);
      expect(fn([10, 5, 3, 4, 3, 5, 6], 2)).toBe(true);
    });

    it('distance 내에 중복이 없는 경우 false를 반환해야 한다', () => {
      expect(fn([1, 2, 3, 4, 5], 3)).toBe(false);
      expect(fn([1, 2, 3, 1, 4, 5], 2)).toBe(false);
    });
  });

  describe('Boundary cases', () => {
    it('distance가 0일 경우 항상 false를 반환해야 한다', () => {
      expect(fn([1, 1, 2, 3], 0)).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('빈 배열이나 요소가 하나인 배열은 false를 반환해야 한다', () => {
      expect(fn([], 3)).toBe(false);
      expect(fn([1], 1)).toBe(false);
    });

    it('distance가 배열의 길이보다 클 경우, 전체 배열에서 중복을 찾는다', () => {
      expect(fn([1, 2, 3, 4, 5], 10)).toBe(false);
      expect(fn([1, 2, 3, 4, 1], 10)).toBe(true);
    });
  });
});
