import iterativeBinarySearch from '@/examples/algorithm/search/iterative-binary';
import recursiveBinarySearch from '@/examples/algorithm/search/recursive-binary';
import {range} from '@/utils/extend/data-type/number';

// yarn test src/examples/algorithm/search/binary-search.test.ts
const searchAlgorithms = [
  {name: 'Iterative Binary Search', fn: iterativeBinarySearch},
  {name: 'Recursive Binary Search', fn: recursiveBinarySearch},
];

const SORTED_ODD_ARRAY = range(0, 100);
const SORTED_EVEN_ARRAY = range(1, 100);

const arrayTestCases = [
  {type: 'an odd-length', array: SORTED_ODD_ARRAY},
  {type: 'an even-length', array: SORTED_EVEN_ARRAY},
];

describe.each(searchAlgorithms)('$name', ({fn}) => {
  describe.each(arrayTestCases)('with $type array', ({array}) => {
    describe('General cases', () => {
      it('should find all middle elements at their correct indices', () => {
        for (let i = 1; i < array.length - 1; i++) {
          const targetValue = array[i];
          expect(fn(array, targetValue)).toBe(i);
        }
      });
    });

    describe('Boundary cases', () => {
      it('should find the first element', () => {
        const firstValue = array[0];
        const firstIndex = 0;
        expect(fn(array, firstValue)).toBe(firstIndex);
      });

      it('should find the last element', () => {
        const lastIndex = array.length - 1;
        expect(fn(array, array[lastIndex])).toBe(lastIndex);
      });
    });

    describe('Edge cases', () => {
      it('should return -1 for a value not present in the array', () => {
        const notFoundValue = 999;
        expect(fn(array, notFoundValue)).toBe(-1);
      });

      it('should return -1 when the array is empty', () => {
        expect(fn([], 123)).toBe(-1);
      });

      it('should find the target even if the array has duplicates', () => {
        const array = [1, 2, 2, 3];
        const target = 2;
        const resultIndex = fn(array, target);
        expect(array[resultIndex]).toBe(target);
      });
    });
  });
});
