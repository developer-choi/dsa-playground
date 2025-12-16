import {bruteForceDivisorsAndMultiples} from '@/coding-test/array/divisors-and-multiples/solution';

// yarn test src/coding-test/array/divisors-and-multiples/solution.test.ts
describe('Divisors and Multiples', () => {
  describe('General cases', () => {
    it('약수 배수 잘 구해야한다.', () => {
      expect(bruteForceDivisorsAndMultiples([1, 3, 4, 2, 6])).toEqual([4, 2, 2, 3, 3]);
    });
  });

  describe('Boundary cases', () => {
    it('중복된 숫자가 있는 경우, 자기 자신을 제외한 개수를 반환해야 한다', () => {
      expect(bruteForceDivisorsAndMultiples([2, 2, 2, 2])).toEqual([3, 3, 3, 3]);
    });

    it('요소가 하나뿐일 때는 비교 대상이 없으므로 0을 반환해야 한다', () => {
      expect(bruteForceDivisorsAndMultiples([10])).toEqual([0]);
    });
  });

  describe('Edge cases', () => {
    it('빈 배열이 입력되면 빈 배열을 반환해야 한다', () => {
      expect(bruteForceDivisorsAndMultiples([])).toEqual([]);
    });
  });
});
