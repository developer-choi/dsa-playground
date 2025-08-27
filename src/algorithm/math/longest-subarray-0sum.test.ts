import {bestLongestSubarray0Sum, bruteForceLongestSubarray0Sum} from '@/algorithm/math/longest-subarray-0sum';

const algorithms = [
  {name: 'Brute Force', fn: bruteForceLongestSubarray0Sum},
  {name: 'Best', fn: bestLongestSubarray0Sum},
];

// yarn test src/algorithm/math/longest-subarray-0sum.test.ts
describe.each(algorithms)('Longest Subarray 0 Sum Algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    it('should return the correct length for the provided example', () => {
      expect(fn([15, -2, 2, -8, 1, 7, 10])).toBe(5);
    });

    it('should return 0 if no subarray with sum 0 exists', () => {
      expect(fn([1, 2, 3])).toBe(0);
    });

    it('should return 1 for an array containing a single zero', () => {
      expect(fn([1, 0, 3])).toBe(1);
    });
  });

  describe('Edge cases', () => {
    it('should return 0 for an empty array', () => {
      expect(fn([])).toBe(0);
    });

    it('should handle cases where the entire array sums to zero', () => {
      expect(fn([2, 3, -5, 1, -1])).toBe(5);
    });

    it('should handle an array containing only zeros', () => {
      expect(fn([0, 0, 0, 0])).toBe(4);
    });

    it('should find the longest among multiple zero-sum subarrays', () => {
      expect(fn([1, -1, 3, -5, 5, 0])).toBe(3);
    });
  });
});
