import {bruteForceUnion, unionSet} from './union';

const algorithms = [
  {name: 'Brute Force', fn: bruteForceUnion},
  {name: 'Set', fn: unionSet},
];

// yarn test src/data-structure/set/union.test.ts
describe.each(algorithms)('Union Algorithm > $name', ({fn}) => {
  describe('General Cases', () => {
    it('should return the correct union of two arrays with overlapping elements', () => {
      const result = fn([1, 2, 3, 2, 1], [3, 2, 2, 3, 3, 2]);
      expect(result.toSorted()).toEqual([1, 2, 3]);
    });

    it('should return the correct union when arrays have no common elements', () => {
      const result = fn([1, 2, 3], [4, 5, 6]);
      expect(result.toSorted()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should handle various types of duplicates correctly', () => {
      const result1 = fn([1, 1, 2, 2], [3, 3, 4, 4]);
      expect(result1.toSorted()).toEqual([1, 2, 3, 4]);

      const result2 = fn([1, 2], [2, 3]);
      expect(result2.toSorted()).toEqual([1, 2, 3]);
    });
  });

  describe('Edge Cases', () => {
    it('should handle cases where one or both arrays are empty', () => {
      expect(fn([], [1, 2, 3]).toSorted()).toEqual([1, 2, 3]);
      expect(fn([1, 2, 3], []).toSorted()).toEqual([1, 2, 3]);
      expect(fn([], [])).toEqual([]);
    });
  });
});
