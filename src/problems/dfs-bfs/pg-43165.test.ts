import {recursive} from './pg-43165';

const solutions = [
  {name: 'recursive', fn: recursive},
];

describe.each(solutions)('$name', ({fn}) => {
  describe('General cases', () => {
    it('주어진 수들에 +/-를 붙여 target을 만드는 방법의 수를 반환한다', () => {
      expect(fn([1, 1, 1, 1, 1], 3)).toBe(5);
      expect(fn([4, 1, 2, 1], 4)).toBe(2);
    });
  });

  describe('Boundary cases', () => {
    it('target을 만들 수 있는 경우의 수가 없으면 0을 반환한다', () => {
      expect(fn([1, 1, 1], 10)).toBe(0);
    });

    it('배열 원소가 1개일 때 경우의 수를 반환한다', () => {
      expect(fn([5], 5)).toBe(1);
      expect(fn([5], -5)).toBe(1);
      expect(fn([5], 3)).toBe(0);
    });
  });

  describe('Edge cases', () => {
    it('빈 배열이면 어떤 target이 와도 0을 반환한다', () => {
      expect(fn([], 1)).toBe(0);
      expect(fn([], -1)).toBe(0);
      expect(fn([], 100)).toBe(0);
    });
  });
});
