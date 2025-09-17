import {findKthOrderValue, OrderType} from '@/algorithm/kth/search';

// yarn test src/algorithm/kth/search.test.ts
describe('findKthOrderValue()', () => {
  describe('General cases', () => {
    const testCases = [
      // k-th Largest
      {array: [12, 35, 1, 10, 34], k: 2, type: 'largest' as OrderType, expected: 34},
      {array: [-10, -5, -2, -15], k: 2, type: 'largest' as OrderType, expected: -5},
      {array: [10, 80, 30, 90, 40, 50, 70], k: 1, type: 'largest' as OrderType, expected: 90},
      {array: [10, 80, 30, 90, 40, 50, 70], k: 7, type: 'largest' as OrderType, expected: 10},
      // k-th Smallest
      {array: [12, 35, 1, 10, 34], k: 3, type: 'smallest' as OrderType, expected: 12},
      {array: [-10, -5, -2, -15], k: 2, type: 'smallest' as OrderType, expected: -10},
      {array: [10, 80, 30, 90, 40, 50, 70], k: 1, type: 'smallest' as OrderType, expected: 10},
      {array: [10, 80, 30, 90, 40, 50, 70], k: 7, type: 'smallest' as OrderType, expected: 90},
    ];

    it.each(testCases)('should return $expected for k=$k ($type) in array [$array]', ({array, k, type, expected}) => {
      expect(findKthOrderValue(array, k, type)).toBe(expected);
    });
  });

  describe('Edge cases', () => {
    it('should return the sole element for a single-element array', () => {
      expect(findKthOrderValue([100], 1, 'largest')).toBe(100);
      expect(findKthOrderValue([100], 1, 'smallest')).toBe(100);
    });

    it('should return undefined for an empty array', () => {
      expect(findKthOrderValue([], 1, 'largest')).toBe(undefined);
      expect(findKthOrderValue([], 1, 'smallest')).toBe(undefined);
    });
  });
});
