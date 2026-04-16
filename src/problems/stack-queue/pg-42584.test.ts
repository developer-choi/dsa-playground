import { stack } from './pg-42584';

const solutions = [
  { name: 'stack', fn: stack },
];

describe.each(solutions)('주식가격 > $name', ({ fn }) => {
  describe('General cases', () => {
    it('입력값이 [1, 2, 3, 2, 3]이면 [4, 3, 1, 1, 0]을 반환한다', () => {
      expect(fn([1, 2, 3, 2, 3])).toEqual([4, 3, 1, 1, 0]);
    });
  });

  describe('Boundary cases', () => {
    it('오름차순 입력이면 내림차순 결과를 반환한다', () => {
      expect(fn([1, 2, 3, 4, 5])).toEqual([4, 3, 2, 1, 0]);
    });
    it('내림차순 입력이면 마지막을 제외하고 모두 1을 반환한다', () => {
      expect(fn([5, 4, 3, 2, 1])).toEqual([1, 1, 1, 1, 0]);
    });
    it('한 번에 여러 가격이 동시에 떨어지면 각각의 유지 기간을 올바르게 반환한다', () => {
      expect(fn([3, 4, 2])).toEqual([2, 1, 0]);
    });
    it('가격이 떨어졌다가 다시 오른 뒤 또 떨어지면 각각의 유지 기간을 올바르게 반환한다', () => {
      expect(fn([5, 3, 4, 2])).toEqual([1, 2, 1, 0]);
    });
  });

  describe('Edge cases', () => {
    it('빈 배열이면 빈 배열을 반환한다', () => {
      expect(fn([])).toEqual([]);
    });
    it('모든 가격이 동일하면 내림차순 결과를 반환한다', () => {
      expect(fn([3, 3, 3])).toEqual([2, 1, 0]);
    });
  });
});
