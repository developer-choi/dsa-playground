import {minimumIncreaseByK} from '@/data-structure/array/minium-increase-by-k';

// yarn test src/data-structure/array/minium-increase-by-k.test.ts
describe('minimumIncreaseByK()', () => {
  describe('General cases', () => {
    it('should return the minimum number of operations', () => {
      expect(minimumIncreaseByK([4, 7, 19, 16], 3)).toBe(10);
    });

    it('should return -1 if it is impossible to make all elements equal', () => {
      expect(minimumIncreaseByK([4, 2, 6, 8], 3)).toBe(-1);
    });
  });

  describe('Edge cases', () => {
    it('should return 0 when all elements are already equal', () => {
      expect(minimumIncreaseByK([4, 4, 4, 4], 3)).toBe(0);
    });

    it('should return 0 for an empty array', () => {
      expect(minimumIncreaseByK([], 5)).toBe(0);
    });

    it('should return 0 for a single-element array', () => {
      expect(minimumIncreaseByK([100], 5)).toBe(0);
    });

    it('should return the sum of differences when k is 1', () => {
      expect(minimumIncreaseByK([1, 2, 3, 10], 1)).toBe(24);
    });
  });
});
