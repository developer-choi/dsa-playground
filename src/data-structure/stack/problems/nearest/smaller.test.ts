import findNearestSmallerNumberOnLeftSide from '@/data-structure/stack/problems/nearest/smaller';
import {randomInArray} from '@/utils/extend/test/random';
import {randomNumericArray} from '@/utils/extend/test/generate-dummy';
import {compareFunctionsWithRandomInputs} from '@/utils/extend/test/jest';

// yarn test src/data-structure/stack/problems/nearest/smaller.test.ts
describe('findNearestSmallerNumberOnLeftSide()', () => {
  describe('General cases', () => {
    it('should satisfy the examples from the GeeksForGeeks problem', () => {
      expect(findNearestSmallerNumberOnLeftSide([1, 6, 2])).toEqual([-1, 1, 1]);
      expect(findNearestSmallerNumberOnLeftSide([1, 5, 0, 3, 4, 5])).toEqual([-1, 1, -1, 0, 3, 4]);
    });

    it('should produce the correct output for random inputs', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: findNearestSmallerNumberOnLeftSide,
        answerFunction: officialAnswer,
        generateInput: () => {
          const length = randomInArray([49, 50])[0];
          return [randomNumericArray(length)] as const;
        }
      });
    });
  });

  describe('Edge cases', () => {
    it('should return an empty array for an empty input', () => {
      expect(findNearestSmallerNumberOnLeftSide([])).toEqual([]);
    });

    it('should handle an array with a single element', () => {
      expect(findNearestSmallerNumberOnLeftSide([100])).toEqual([-1]);
    });

    it('should work correctly for an array with all same elements', () => {
      expect(findNearestSmallerNumberOnLeftSide([5, 5, 5, 5])).toEqual([-1, -1, -1, -1]);
    });

    it('should work for a strictly increasing array', () => {
      expect(findNearestSmallerNumberOnLeftSide([10, 20, 30, 40])).toEqual([-1, 10, 20, 30]);
    });

    it('should work for a strictly decreasing array', () => {
      expect(findNearestSmallerNumberOnLeftSide([40, 30, 20, 10])).toEqual([-1, -1, -1, -1]);
    });
  });
});

function officialAnswer(array: number[]) {
  const candidates: number[] = [];
  const result: number[] = [];

  array.forEach((num) => {
    while (candidates.length && candidates[candidates.length - 1] >= num) {
      candidates.pop();
    }

    if (candidates.length === 0) {
      result.push(-1);
    } else {
      result.push(candidates[candidates.length - 1]);
    }

    candidates.push(num);
  });

  return result;
}
