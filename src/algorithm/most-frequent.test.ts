import {getMostFrequentElementsUsingMap} from '@/algorithm/most-frequent';
import {range} from '@forworkchoe/core/utils';

const algorithms = [
  {name: 'Hashmap & Sorting', fn: getMostFrequentElementsUsingMap},
];

// yarn test src/algorithm/most-frequent.test.ts
describe.each(algorithms)('Most Frequent Algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    it('should sort by frequency, then by value in descending order', () => {
      const original = range(1, 4);
      expect(fn([...original, ...original], original.length)).toEqual(original.toReversed());
    });

    it('should return the most frequent elements in order', () => {
      expect(fn([1, 2, 2, 3, 3, 3, 4, 4, 4, 4], 4)).toEqual([4, 3, 2, 1]);
    });
  });

  describe('Boundary cases', () => {
    it('should return an empty array for an empty input array', () => {
      expect(fn([], 0)).toEqual([]);
    });

    it('should return an empty array when count is 0', () => {
      expect(fn([1, 2, 2, 3], 0)).toEqual([]);
    });
  });

  describe('Edge cases', () => {
    it('should throw a TypeError when count is larger than the array length', () => {
      const array = [1, 2];
      expect(() => fn(array, array.length + 2)).toThrow(TypeError);
    });
  });
});
