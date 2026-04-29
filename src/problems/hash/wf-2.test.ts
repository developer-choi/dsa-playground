import { solution } from './wf-2';

const solutions = [
  { name: 'hash', fn: solution },
];

describe.each(solutions)('음식 주문 분석 > $name', ({ fn }) => {
  describe('General cases', () => {
    it('가장 많은 종류의 음식을 주문한 유저 목록을 알파벳 오름차순으로 반환한다', () => {
      const orders1 = ['alex pizza pasta', 'alex pizza pizza', 'bob noodle sandwich pasta', 'chol pizza sandwich pizza', 'alex pizza pasta steak'];
      expect(fn(orders1)).toEqual(['alex', 'bob']);

      const orders2 = ['alex pizza pasta', 'alex pizza pizza', 'chol pizza sandwich pizza', 'bob noodle sandwich pasta', 'bob steak'];
      expect(fn(orders2)).toEqual(['bob']);
    });
  });

  describe('Boundary cases', () => {
  });

  describe('Edge cases', () => {
  });
});
