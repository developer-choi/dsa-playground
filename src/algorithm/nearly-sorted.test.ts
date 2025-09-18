import {nearlySorted} from '@/algorithm/nearly-sorted';
import {range} from '@forworkchoe/core/utils';

// yarn test src/algorithm/nearly-sorted.test.ts
describe('nearlySorted()', () => {
  describe('General cases', () => {
    it('should satisfy the examples', () => {
      expect(nearlySorted([6, 5, 3, 2, 8, 10, 9], 3)).toEqual([2, 3, 5, 6, 8, 9, 10]);
      expect(nearlySorted([1, 4, 5, 2, 3, 6, 7, 8, 9, 10], 2)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  });

  describe('Boundary cases', () => {
    it('should work correctly with an array of length 2', () => {
      expect(nearlySorted([2, 1], 1)).toEqual([1, 2]);
    });

    it('should work correctly when nearlyDistance is 0', () => {
      expect(nearlySorted([1, 2, 3, 4, 5], 0)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return an empty array for an empty input array', () => {
      expect(nearlySorted([], 0)).toEqual([]);
    });
  });

  describe('Edge cases', () => {
    it('should return the same array if it is already sorted', () => {
      const input = range(1, 10);
      expect(nearlySorted(input, 2)).toEqual(input);
    });

    it('should handle duplicate elements correctly', () => {
      expect(nearlySorted([2, 1, 3, 2], 2)).toEqual([1, 2, 2, 3]);
    });

    it('should throw an error if nearlyDistance is greater than the array length', () => {
      expect(() => nearlySorted([2, 1, 3, 2], 999)).toThrow(TypeError);
    });
  });
});
