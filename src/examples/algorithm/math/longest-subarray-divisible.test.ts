import {
  bestLongestSubarrayDivisible,
  bruteForceLongestSubarrayDivisible
} from '@/examples/algorithm/math/longest-subarray-divisible';
import {randomNumericArray} from '@/utils/extend/test/generate-dummy';
import {randomInArray} from '@/utils/extend/test/random';

const algorithms = [
  {name: 'Brute Force', fn: bruteForceLongestSubarrayDivisible},
  {name: 'Best', fn: bestLongestSubarrayDivisible},
];

// yarn test src/examples/algorithm/math/longest-subarray-divisible.test.ts
describe.each(algorithms)('Longest Subarray Divisible Algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    it('should pass the examples from the problem description', () => {
      expect(fn([2, 7, 6, 1, 4, 5], 3)).toBe(4);
      expect(fn([-2, 2, -5, 12, -11, -1, 7], 3)).toBe(5);
      expect(fn([1, 2, -2], 5)).toBe(2);
    });

    it('should produce the same result as the brute-force method on random arrays', () => {
      for (let i = 0; i < 100; i++) {
        const param1 = randomNumericArray(50);
        const param2 = randomInArray([2, 3, 5, 7])[0];
        const answer = bruteForceLongestSubarrayDivisible(param1, param2);
        const output = fn(param1, param2);

        try {
          expect(output).toEqual(answer);
        } catch (error) {
          console.error({
            input: {param1, param2},
            output,
            expected: answer
          });
          throw error;
        }
      }
    });
  });

  describe('Edge cases', () => {
    it('should handle an array of all negative numbers', () => {
      expect(fn([-1, -2, -3, -4, -5], 3)).toBe(5);
    });
  });
});
