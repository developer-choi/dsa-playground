import {
  bestLongestSubarrayDivisible,
  bruteForceLongestSubarrayDivisible
} from '@/algorithm/math/longest-subarray-divisible';
import {compareFunctionsWithRandomInputs} from '@/utils/jest';
import {randomInArray, randomNumericArray} from '@forworkchoe/core/utils';

const algorithms = [
  {name: 'Brute Force', fn: bruteForceLongestSubarrayDivisible},
  {name: 'Best', fn: bestLongestSubarrayDivisible},
];

// yarn test src/algorithm/math/longest-subarray-divisible.test.ts
describe.each(algorithms)('Longest Subarray Divisible Algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    it('should pass the examples from the problem description', () => {
      expect(fn([2, 7, 6, 1, 4, 5], 3)).toBe(4);
      expect(fn([-2, 2, -5, 12, -11, -1, 7], 3)).toBe(5);
      expect(fn([1, 2, -2], 5)).toBe(2);
    });

    it('should produce the correct output for random inputs', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: fn,
        answerFunction: bruteForceLongestSubarrayDivisible,
        generateInput: () => {
          const param1 = randomNumericArray(50);
          const param2 = randomInArray([2, 3, 5, 7])[0];
          return [param1, param2] as const;
        },
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle an array of all negative numbers', () => {
      expect(fn([-1, -2, -3, -4, -5], 3)).toBe(5);
    });
  });
});
