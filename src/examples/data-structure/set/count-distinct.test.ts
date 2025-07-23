import {betterCountDistinct, bruteForceCountDistinct} from '@/examples/data-structure/set/count-distinct';

const algorithms = [
  {name: 'Brute Force', fn: bruteForceCountDistinct},
  {name: 'Better', fn: betterCountDistinct},
];

// yarn test src/examples/data-structure/set/count-distinct.test.ts
describe.each(algorithms)('Count Distinct Algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    it('should return the correct counts for a general case', () => {
      expect(fn([1, 2, 1, 3, 4, 2, 3], 4)).toEqual([3, 4, 4, 3]);
    });

    it('should return the correct counts for another general case', () => {
      expect(fn([4, 1, 1], 2)).toEqual([2, 1]);
    });
  });

  describe('Boundary cases', () => {
    it('should return a single result when window size equals array length', () => {
      expect(fn([1, 2, 1, 4], 4)).toEqual([3]);
    });

    it('should return correct counts when all elements are the same', () => {
      expect(fn([1, 1, 1, 1, 1], 3)).toEqual([1, 1, 1]);
    });

    it('should return correct counts when all elements are distinct', () => {
      expect(fn([1, 2, 3, 4, 5], 3)).toEqual([3, 3, 3]);
    });
  });

  describe('Edge cases', () => {
    it('should throw a TypeError when window size is greater than array length', () => {
      expect(() => fn([1, 2], 3)).toThrow(TypeError);
    });

    it('should throw a TypeError for an empty array if size > 0', () => {
      expect(() => fn([], 1)).toThrow(TypeError);
    });

    it('should return an empty array if the input array is empty and size is 0', () => {
      expect(fn([], 0)).toEqual([]);
    });

    it('should return an array of 1s when window size is 1', () => {
      expect(fn([1, 5, 2, 4], 1)).toEqual([1, 1, 1, 1]);
    });
  });
});
