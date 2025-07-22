import {bruteForceMostFrequent, mapMostFrequent} from '@/examples/data-structure/map/most-frequent';

const algorithms = [
  {name: 'Brute Force', fn: bruteForceMostFrequent},
  {name: 'Map (Optimized)', fn: mapMostFrequent},
];

// yarn test src/examples/data-structure/map/most-frequent.test.ts
describe.each(algorithms)('Most Frequent Element > $name', ({fn}) => {
  describe('General cases', () => {
    it('should return the most frequent element for standard cases', () => {
      expect(fn([1, 3, 2, 1, 4, 1])).toBe(1);
      expect(fn([10, 20, 10, 20, 30, 20, 20])).toBe(20);
    });

    it('should return the largest number if frequencies are tied', () => {
      expect(fn([1, 2, 2, 4, 1])).toBe(2);
      expect(fn([3, 5, 3, 5, 3, 5, 1])).toBe(5);
    });
  });

  describe('Edge cases', () => {
    it('should return undefined for an empty array', () => {
      expect(fn([])).toBeUndefined();
    });

    it('should return the largest element when all elements are unique', () => {
      expect(fn([1, 2, 3, 4, 5])).toBe(5);
    });

    it('should return the element itself when all elements are the same', () => {
      expect(fn([7, 7, 7, 7])).toBe(7);
    });

    it('should handle negative numbers correctly', () => {
      expect(fn([-1, -1, -1, 2, 2])).toBe(-1);
      expect(fn([-1, -2, -1, -2, 0])).toBe(-1);
    });

    it('should return the largest value even if a smaller tied value appears first', () => {
      expect(fn([100, 2, 3, 100, 500, 6, 500])).toBe(500);
    });
  });
});