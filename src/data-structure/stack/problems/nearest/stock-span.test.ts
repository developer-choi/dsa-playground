import {stockSpanUsingLoop, stockSpanUsingStack} from '@/data-structure/stack/problems/nearest/stock-span';
import {compareFunctionsWithRandomInputs} from '@/utils/extend/test/jest';
import {randomInArray, randomNumericArray} from '@forworkchoe/core/utils';

const stockSpanAlgorithms = [
  {name: 'Loop', fn: stockSpanUsingLoop},
  {name: 'Stack', fn: stockSpanUsingStack},
];

// yarn test src/data-structure/stack/problems/nearest/stock-span.test.ts
describe.each(stockSpanAlgorithms)('Stock Span Using $name', ({fn}) => {
  describe('General cases', () => {
    it('should work correctly with problem examples', () => {
      expect(fn([100, 80, 60, 70, 60, 75, 85])).toEqual([1, 1, 1, 2, 1, 4, 6]);
      expect(fn([10, 4, 5, 90, 120, 80])).toEqual([1, 1, 2, 4, 5, 1]);
    });

    it('should produce the correct output for random inputs', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: fn,
        answerFunction: officialAnswer,
        generateInput: () => {
          const length = randomInArray([49, 50])[0];
          const value = randomNumericArray(length);
          return [value] as const;
        }
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle a single-element array', () => {
      expect(fn([50])).toEqual([1]);
    });

    it('should handle an empty array', () => {
      expect(fn([])).toEqual([]);
    });

    it('should handle an array with all increasing elements', () => {
      expect(fn([10, 20, 30, 40, 50])).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle an array with all decreasing elements', () => {
      expect(fn([50, 40, 30, 20, 10])).toEqual([1, 1, 1, 1, 1]);
    });

    it('should handle an array with consecutive identical elements', () => {
      expect(fn([70, 70, 70, 70])).toEqual([1, 2, 3, 4]);
    });
  });
});

function officialAnswer(arr: number[]) {
  let n = arr.length;
  let span = new Array(n);
  let stk = [];

  for (let i = 0; i < n; i++) {

    while (stk.length > 0
    && arr[stk[stk.length - 1]] <= arr[i]) {

      stk.pop();
    }

    if (stk.length === 0) {
      span[i] = (i + 1);
    } else {
      span[i] = (i - stk[stk.length - 1]);
    }

    stk.push(i);
  }

  return span;
}