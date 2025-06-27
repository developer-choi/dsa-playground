import {randomNumericArray} from '@/utils/extend/test/generate-dummy';
import {removeDuplicatedItems} from '@/utils/extend/data-type/array';
import {randomNumber} from '@/utils/extend/test/random';
import bruteForceAggressiveCows from '@/examples/algorithm/search/aggressive-cows/brute-force';

describe('bruteForceAggressiveCows()', () => {
  describe('General cases', () => {
    it('랜덤테스트를 통과해야한다.', () => {
      for (let i = 0; i < 50; i++) {
        const array = removeDuplicatedItems(randomNumericArray(100)).toSorted((a, b) => a - b).map(value => value * randomNumber(2, 5));
        const cowsCount = randomNumber(3, array.length);
        expect(bruteForceAggressiveCows(array, cowsCount)).toBe(solution(array, cowsCount));
      }
    });
  });

  describe('Boundary cases', () => {
    // cows count랑 stalls 갯수가 똑같은 케이스 체크
  });

  describe('Edge cases', () => {
    // Type Error 던져지는 케이스 2개에서 TypeError가 던져지는지 체크
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
