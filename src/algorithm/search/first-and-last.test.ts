import findFirstAndLast from './first-and-last'; // 실제 파일 경로에 맞게 수정해주세요.
import {range} from '@forworkchoe/core/utils';

const SORTED_ODD_ARRAY = range(0, 20).concat(range(0, 21)).sort((a, b) => a - b);
const SORTED_EVEN_ARRAY = SORTED_ODD_ARRAY.concat(22);

const arrayTestCases = [
  {type: 'an odd-length', array: SORTED_ODD_ARRAY},
  {type: 'an even-length', array: SORTED_EVEN_ARRAY},
];

// yarn test src/algorithm/search/first-and-last.test.ts
describe('findFirstAndLast', () => {
  describe.each(arrayTestCases)('with $type array', ({array}) => {
    describe('General cases', () => {
      it('should find the correct first and last index for middle elements', () => {
        for (let i = 1; i < Array.from(new Set(array)).length - 1; i++) {
          expect(findFirstAndLast(array, i)).toEqual({
            firstIndex: array.indexOf(i),
            lastIndex: array.lastIndexOf(i),
          });
        }
      });
    });

    describe('Boundary cases', () => {
      it('should find the first element', () => {
        const firstValue = array[0];

        expect(findFirstAndLast(array, firstValue)).toEqual({
          firstIndex: array.indexOf(firstValue),
          lastIndex: array.lastIndexOf(firstValue)
        });
      });

      it('should find the last element', () => {
        const lastValue = array[array.length - 1];

        expect(findFirstAndLast(array, lastValue)).toEqual({
          firstIndex: array.indexOf(lastValue),
          lastIndex: array.lastIndexOf(lastValue)
        });
      });
    });

    describe('Edge cases', () => {
      it('should return -1 for a value not present in the array', () => {
        const notFoundValue = 999;
        expect(findFirstAndLast(array, notFoundValue)).toEqual({
          firstIndex: -1,
          lastIndex: -1,
        });
      });

      it('should return -1 when the array is empty', () => {
        expect(findFirstAndLast([], -123)).toEqual({
          firstIndex: -1,
          lastIndex: -1,
        });
      });

      it('should return the same first and last index for every element in a non-duplicated array', () => {
        const NOT_DUPLICATED_ARRAY = range(0, 20);

        NOT_DUPLICATED_ARRAY.forEach((value, index) => {
          expect(findFirstAndLast(NOT_DUPLICATED_ARRAY, value)).toEqual({
            firstIndex: index,
            lastIndex: index,
          });
        });
      });
    });
  });
});
