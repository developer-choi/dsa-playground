import {findKthOrderValue, findKthOrderValues, OrderType} from '@/algorithm/kth/search';
import {sortByNumber} from '@forworkchoe/core/utils';

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

  describe('Boundary cases', () => {
    it('should return the sole element for a single-element array', () => {
      expect(findKthOrderValue([100], 1, 'largest')).toBe(100);
      expect(findKthOrderValue([100], 1, 'smallest')).toBe(100);
    });
  });

  describe('Edge cases', () => {
    it('array.length 보다 order가 더 큰 경우 에러가 던져져야한다.', () => {
      expect(() => findKthOrderValue([100], 2, 'largest')).toThrow(TypeError);
    });
  });
});

describe('findKthOrderValues()', () => {
  describe('General cases', () => {
    it('예제는 만족해야한다.', () => {
      expect(findKthOrderValues([1, 23, 12, 9, 30, 2, 50], 3, 'largest')).toEqual([50, 30, 23]);
      expect(findKthOrderValues([11, 5, 12, 9, 44, 17, 2], 2, 'largest')).toEqual([44, 17]);
    });
  });

  describe('Edge cases', () => {
    it('배열 길이보다 order가 더 크면 그 배열 원본과 같아야 한다.', () => {
      const array = [1, 2, 3, 4, 5];
      expect(findKthOrderValues(array, array.length + 1, 'largest')).toEqual(sortByNumber('desc', array, value => value));
      expect(findKthOrderValues(array, array.length + 1, 'smallest')).toEqual(sortByNumber('asc', array, value => value));
    });
  });
});
