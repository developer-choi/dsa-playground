import bubbleSort from '@/examples/algorithm/sort/bubble';
import {randomNumericArray} from '@/utils/extend/test/generate-dummy';
import {randomInArray} from '@/utils/extend/test/random';
import {SortParam} from '@/examples/algorithm/sort';
import {sortByNumber} from '@/utils/extend/data-type/array';

const algorithms = [
  {name: 'Bubble Sort', fn: bubbleSort},
];

describe.each(algorithms)('$name Algorithm', ({fn}) => {
  describe('General cases', () => {
    it('should sort an array in ascending order', () => {
      const result = fn({value: [5, 4, 3, 2, 1], order: 'asc'});
      expect(result.value).toEqual([1, 2, 3, 4, 5]);
    });

    it('should sort an array in descending order', () => {
      const result = fn({value: [1, 2, 3, 4, 5], order: 'desc'});
      expect(result.value).toEqual([5, 4, 3, 2, 1]);
    });

    it('should ensure correctness across various cases', () => {
      for(let i = 0 ; i < 100 ; i++) {
        const value = randomNumericArray(100);
        const order = randomInArray<SortParam['order']>(['asc', 'desc'])[0];
        const answer = sortByNumber(order, value, item => item);
        const result = fn({value, order});
        expect(result.value).toEqual(answer);
      }
    });
  });

  describe('Edge cases', () => {
    it('should handle an array with duplicate elements', () => {
      const result = fn({value: [5, 2, 3, 2, 5], order: 'asc'});
      expect(result.value).toEqual([2, 2, 3, 5, 5]);
    });

    it('should not mutate the original input array', () => {
      const originalArray = [3, 1, 2];
      fn({value: originalArray, order: 'asc'});
      expect(originalArray).toEqual([3, 1, 2]);
    });

    it('should handle an empty array', () => {
      const result = fn({value: [], order: 'asc'});
      expect(result.value).toEqual([]);
    });

    it('should handle a single-element array', () => {
      const result = fn({value: [1], order: 'asc'});
      expect(result.value).toEqual([1]);
    });

    it('should handle an 2개 있는 array', () => {
      const result = fn({value: [1], order: 'asc'});
      expect(result.value).toEqual([1]);
    });
  });
});
