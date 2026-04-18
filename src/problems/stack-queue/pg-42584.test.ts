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
  });

  describe('Edge cases', () => {
  });
});
