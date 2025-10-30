import {duplicateWithinUsingBruteForce, duplicateWithinUsingSlidingWindow} from '@/data-structure/array/duplicate-within';

const algorithms = [
  {name: 'Brute Force', fn: duplicateWithinUsingBruteForce},
  {name: 'Sliding Window', fn: duplicateWithinUsingSlidingWindow},
];

// yarn test src/data-structure/array/duplicate-within.test.ts
describe.each(algorithms)('Duplicate within k distance algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    it('should return true if there are duplicates within the distance', () => {
      expect(fn([1, 2, 3, 1, 4, 5], 3)).toBe(true);
      expect(fn([10, 5, 3, 4, 3, 5, 6], 2)).toBe(true);
    });

    it('should return false if there are no duplicates within the distance', () => {
      expect(fn([1, 2, 3, 4, 5], 3)).toBe(false);
      expect(fn([1, 2, 3, 1, 4, 5], 2)).toBe(false);
    });
  });

  describe('Boundary cases', () => {
    it('should always return false if distance is 0', () => {
      expect(fn([1, 1, 2, 3], 0)).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('should return false for an empty array or an array with a single element', () => {
      expect(fn([], 3)).toBe(false);
      expect(fn([1], 1)).toBe(false);
    });

    it('should find duplicates in the entire array if distance is greater than array length', () => {
      expect(fn([1, 2, 3, 4, 5], 10)).toBe(false);
      expect(fn([1, 2, 3, 4, 1], 10)).toBe(true);
    });
  });
});
