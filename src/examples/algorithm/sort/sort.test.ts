import bubbleSort from '@/examples/algorithm/sort/bubble';
import {randomNumericArray} from '@/utils/extend/test/generate-dummy';
import {randomInArray} from '@/utils/extend/test/random';
import {SortParam} from '@/examples/algorithm/sort/index';
import {sortByNumber} from '@/utils/extend/data-type/array';
import selectionSort from '@/examples/algorithm/sort/selection';
import insertionSort from '@/examples/algorithm/sort/insertion';
import quickSort from '@/examples/algorithm/sort/quick';
import sortUsingStack from '@/examples/data-structure/stack/problems/sort';
import {compareFunctionsWithRandomInputs} from '@/utils/extend/test/jest';

// yarn test src/examples/algorithm/sort/sort.test.ts
const algorithms = [
  {name: 'Bubble Sort', fn: bubbleSort},
  {name: 'Selection Sort', fn: selectionSort},
  {name: 'Insertion Sort', fn: insertionSort},
  {name: 'Quick Sort', fn: quickSort},
  {name: 'Sort using stack', fn: sortUsingStack},
];

describe.each(algorithms)('Sorting Algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    it('should sort an array in ascending order', () => {
      const {output} = fn({value: [5, 4, 3, 2, 1], order: 'asc'});
      expect(output).toEqual([1, 2, 3, 4, 5]);
    });

    it('should sort an array in descending order', () => {
      const {output} = fn({value: [1, 2, 3, 4, 5], order: 'desc'});
      expect(output).toEqual([5, 4, 3, 2, 1]);
    });

    it('should produce the correct output for random inputs', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: (param) => fn(param).output,
        answerFunction: ({value, order}: SortParam) => {
          return sortByNumber(order, value, item => item);
        },
        generateInput: () => {
          const length = randomInArray([49, 50])[0];
          const value = randomNumericArray(length);
          const order = randomInArray<SortParam['order']>(['asc', 'desc'])[0];
          return [{value, order}] as const;
        }
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle a pre-sorted ascending array', () => {
      const sortedArray = [1, 2, 3, 4, 5];
      const {output} = fn({value: sortedArray, order: 'asc'});
      expect(output).toEqual(sortedArray);
    });

    it('should handle a pre-sorted descending array', () => {
      const sortedArray = [5, 4, 3, 2, 1];
      const {output} = fn({value: sortedArray, order: 'desc'});
      expect(output).toEqual(sortedArray);
    });

    it('should handle an array with duplicate elements', () => {
      const {output} = fn({value: [5, 2, 3, 2, 5], order: 'asc'});
      expect(output).toEqual([2, 2, 3, 5, 5]);
    });

    it('should not mutate the original input array', () => {
      const originalArray = [3, 1, 2];
      fn({value: originalArray, order: 'asc'});
      expect(originalArray).toEqual([3, 1, 2]);
    });

    it('should handle an empty array', () => {
      const {output} = fn({value: [], order: 'asc'});
      expect(output).toEqual([]);
    });

    it('should handle a single-element array', () => {
      const {output} = fn({value: [42], order: 'asc'});
      expect(output).toEqual([42]);
    });

    it('should handle a two-element array', () => {
      const {output} = fn({value: [2, 1], order: 'asc'});
      expect(output).toEqual([1, 2]);
    });
  });
});