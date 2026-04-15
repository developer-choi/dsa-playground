import { stack } from './boj-2493';

const solutions = [
  { name: 'stack', fn: stack },
];

describe.each(solutions)('탑 > $name', ({ fn }) => {
  describe('General cases', () => {
    it('각 탑이 레이저를 수신하는 탑 번호를 반환한다', () => {
      expect(fn([6, 9, 5, 7, 4])).toEqual([0, 0, 2, 2, 4]);
    });
  });

  describe('Edge cases', () => {
    it('빈 배열이면 빈 배열을 반환한다', () => {
      expect(fn([])).toEqual([]);
    });
  });
});
