import {randomNumericArray} from '@/utils/extend/test/generate-dummy';
import {removeDuplicatedItems} from '@/utils/extend/data-type/array';
import {randomNumber} from '@/utils/extend/test/random';
import bruteForceAggressiveCows from '@/examples/algorithm/search/aggressive-cows/brute-force';
import binarySearchAggressiveCows from '@/examples/algorithm/search/aggressive-cows/binary';

const aggressiveCowsAlgorithms = [
  {name: 'bruteForceAggressiveCows', fn: bruteForceAggressiveCows},
  {name: 'binarySearchAggressiveCows', fn: binarySearchAggressiveCows},
];

describe.each(aggressiveCowsAlgorithms)('$name', ({fn}) => {
  describe('General cases', () => {
    it('should pass randomized tests', () => {
      for (let i = 0; i < 50; i++) {
        const array = removeDuplicatedItems(randomNumericArray(100)).toSorted((a, b) => a - b).map(value => value * randomNumber(2, 5));
        const cowsCount = randomNumber(3, array.length);
        let actual = fn(array, cowsCount);
        let expected = solution(array, cowsCount);

        try {
          expect(actual).toBe(expected);
        } catch (error) {
          console.error({
            array,
            cowsCount,
            actual,
            expected
          });
          throw error;
        }
      }
    });
  });

  describe('Boundary cases', () => {
    it('should return the minimum distance between adjacent stalls when the number of cows is equal to the number of stalls', () => {
      const stalls = [1, 2, 4, 8, 13]; // Gaps are 1, 2, 4, 5. The minimum gap is 1.
      expect(fn(stalls, stalls.length)).toBe(1);
    });
  });

  describe('Edge cases', () => {
    it('should throw a TypeError if the number of cows is greater than the number of stalls', () => {
      const stalls = [1, 2, 3];
      expect(() => fn(stalls, stalls.length + 1)).toThrow(TypeError);
    });

    it('should throw a TypeError if the number of stalls is less than 2', () => {
      expect(() => fn([10], 1)).toThrow(TypeError);
      expect(() => fn([], 0)).toThrow(TypeError);
    });
  });
});

/*************************************************************************************************************
 * Geeksforgeeks 정답지 코드 > https://www.geeksforgeeks.org/dsa/assign-stalls-to-k-cows-to-maximize-the-minimum-distance-between-them/
 *************************************************************************************************************/
function check(stalls: number[], k: number, dist: number) {
  let cnt = 1;
  let prev = stalls[0];
  for (let i = 1; i < stalls.length; i++) {

    if (stalls[i] - prev >= dist) {
      prev = stalls[i];
      cnt++;
    }
  }

  return (cnt >= k);
}

function solution(stalls: number[], k: number) {
  stalls.sort((a, b) => a - b);
  let res = null;

  let minDist = 1;
  let maxDist = stalls[stalls.length - 1] - stalls[0];

  for (let i = minDist; i <= maxDist; i++) {
    if (check(stalls, k, i))
      res = i;
  }

  return res;
}