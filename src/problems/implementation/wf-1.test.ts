import { simulation } from './wf-1';

const solutions = [
  { name: 'simulation', fn: simulation },
];

describe.each(solutions)('아파트 관리비 > $name', ({ fn }) => {
  describe('General cases', () => {
    it('1~12월 각 달의 납부일 주말 여부를 배열로 반환한다', () => {
      expect(fn(6, 1)).toEqual([1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0]);
      expect(fn(6, 25)).toEqual([0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0]);
    });
  });

  describe('Boundary cases', () => {
  });

  describe('Edge cases', () => {
  });
});
