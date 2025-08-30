import findNearestGreaterNumberOnRightSide from '@/data-structure/stack/problems/nearest/greater';
import {compareFunctionsWithRandomInputs} from '@/utils/extend/test/jest';
import {randomInArray, randomNumericArray} from '@forworkchoe/core/utils';

// yarn test src/data-structure/stack/problems/nearest/greater.test.ts
describe('findNearestGreaterNumberOnRightSide()', () => {
  describe('General cases', () => {
    it('should return the correct output for the example cases', () => {
      expect(findNearestGreaterNumberOnRightSide([1, 3, 2, 4])).toEqual([3, 4, 4, -1]);
      expect(findNearestGreaterNumberOnRightSide([6, 8, 0, 1, 3])).toEqual([8, -1, 1, 3, -1]);
      expect(findNearestGreaterNumberOnRightSide([50, 40, 30, 10])).toEqual([-1, -1, -1, -1]);
    });

    it('should produce the correct output for random inputs', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: findNearestGreaterNumberOnRightSide,
        answerFunction: officialAnswer,
        generateInput: () => {
          const length = randomInArray([25, 26])[0];
          return [randomNumericArray(length)] as const;
        }
      });
    });
  });
});

function officialAnswer(array: number[]) {
  let n = array.length;
  let res = new Array(n).fill(-1);
  let stk = [];

  // Traverse the array from right to left
  for (let i = n - 1; i >= 0; i--) {

    // Pop elements from the stack that are less
    // than or equal to the current element
    while (stk.length > 0
    && stk[stk.length - 1] <= array[i]) {

      stk.pop();
    }

    // If the stack is not empty, the top element
    // is the next greater element
    if (stk.length > 0) {
      res[i] = stk[stk.length - 1];
    }

    // Push the current element onto the stack
    stk.push(array[i]);
  }

  return res;
}
