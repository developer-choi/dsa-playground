import { sieve } from './boj-1929';

const solutions = [
  {name: 'sieve', fn: sieve},
];

const primesUnder100 = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
  31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97,
];

describe.each(solutions)('소수 구하기 > $name', ({fn}) => {
  describe('General cases', () => {
    it('입력값 이하의 소수를 오름차순으로 반환한다', () => {
      expect(fn(20)).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
    });

    it('100 이하의 소수를 빠짐없이 반환한다', () => {
      expect(fn(100)).toEqual(primesUnder100);
    });
  });

  describe('Boundary cases', () => {
    it('1은 소수가 아니므로 빈 배열을 반환한다', () => {
      expect(fn(1)).toEqual([]);
    });

    it('가장 작은 소수인 2를 포함한다', () => {
      expect(fn(2)).toEqual([2]);
    });
  });

  describe('Edge cases', () => {
    it('입력값 자신이 소수면 결과에 포함한다', () => {
      expect(fn(7)).toEqual([2, 3, 5, 7]);
    });

    it('입력값 자신이 합성수면 결과에서 제외한다', () => {
      expect(fn(4)).toEqual([2, 3]);
    });
  });
});
