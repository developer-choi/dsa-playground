import {duplicateWithinUsingBruteForce} from '@/data-structure/array/sliding-window/duplicate-within';

const algorithms = [
  {name: 'Brute Force', fn: duplicateWithinUsingBruteForce},
];

// yarn test src/algorithm/sort/sort.test.ts
describe.each(algorithms)('Duplicate within k distance algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    it('거리가 k와 같은 중복 요소가 있는 경우 true를 반환해야 한다', () => {
      expect(fn([1, 2, 3, 1, 4, 5], 3)).toBe(true);
    });
  });

  describe('Boundary cases', () => {
  });

  describe('Edge cases', () => {
    it('중복 요소가 없는 경우 false를 반환해야 한다', () => {
      expect(fn([1, 2, 3, 4, 5], 3)).toBe(false);
    });

    it('거리가 k보다 큰 중복 요소만 있는 경우 false를 반환해야 한다', () => {
      expect(fn([1, 2, 3, 4, 1, 2, 3, 4], 3)).toBe(false);
    });
  });
});
