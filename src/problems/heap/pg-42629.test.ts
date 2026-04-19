import { recursive } from './pg-42629';

const solutions = [
  {name: 'recursive', fn: recursive},
];

describe.each(solutions)('라면공장 > $name', ({fn}) => {
  describe('General cases', () => {
    it('최소 공급 횟수를 반환한다', () => {
      expect(fn(4, [4, 10, 15], [20, 5, 10], 30)).toBe(2);
    });
  });

  describe('Boundary cases', () => {
    // 1억, [적당히 긴 배열], [적당히 긴 배열], 1 ==> 0
    // 1, [적당히 긴 배열], [적당히 긴 배열], 2억 ==> 타입에러


    // 1억, [1], [1], 1 ==> 0
    // 1, [1], [1], 2억 ==> 타입에러
  });

  describe('Edge cases', () => {
    // 해외보급이 빈배열 이면서 위의 케이스들 하나씩 명시
  });
});
