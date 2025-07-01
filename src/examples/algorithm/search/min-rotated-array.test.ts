import {randomRotatedNumberArray} from '@/utils/extend/test/generate-dummy';
import findMinRotatedArray from '@/examples/algorithm/search/min-rotated-array';

describe('findMinRotatedArray()', () => {
  describe('General cases', () => {
    it('should find the minimum value in a randomly rotated sorted array', () => {
      for (let i = 0; i < 50; i++) {
        const array = randomRotatedNumberArray(100, 'asc');
        expect(findMinRotatedArray(array)).toBe(Math.min(...array));
      }
    });
  });

  describe('Edge cases', () => {
    it('should return null for an empty array', () => {
      expect(findMinRotatedArray([])).toBe(null);
    });

    it('should find the minimum value in an array with a single element', () => {
      const value = 1;
      expect(findMinRotatedArray([value])).toBe(value);
    });

    it('should find the minimum value in an array with two elements', () => {
      expect(findMinRotatedArray([2, 1])).toBe(1);
      expect(findMinRotatedArray([1, 2])).toBe(1);
    });

    it('should find the minimum value in an array with duplicate elements', () => {
      expect(findMinRotatedArray([3, 3, 4, 4, 5, 5, 1, 1, 2, 2])).toBe(1);
    });
  });
});
