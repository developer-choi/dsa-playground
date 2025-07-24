import {bruteForceTwoSum, hashTwoSum, twoPointersTwoSum} from '@/examples/data-structure/set/two-sum';

const algorithms = [
  {name: 'Brute Force', fn: bruteForceTwoSum},
  {name: 'Two Pointers', fn: twoPointersTwoSum},
  {name: 'Set', fn: hashTwoSum},
];

// yarn test src/examples/data-structure/set/two-sum.test.ts
describe.each(algorithms)('Two Sum > $name', ({fn}) => {
  describe('General cases', () => {
    it('should satisfy the example cases', () => {
      expect(fn([0, -1, 2, -3, 1], -2)).toBe(true);
      expect(fn([1, -2, 1, 0, 5], 0)).toBe(false);
    });

    it('should return true for a pair of identical numbers', () => {
      expect(fn([3, 3], 6)).toBe(true);
      expect(fn([5, 2, 6, 5], 10)).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should handle an array with a single element', () => {
      expect(fn([1], 1)).toBe(false);
    });
    it('should handle an empty array', () => {
      expect(fn([], 0)).toBe(false);
    });
  });
});
