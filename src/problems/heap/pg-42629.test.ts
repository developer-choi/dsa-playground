import { solution } from './pg-42629';

const solutions = [
  {name: 'solution', fn: solution},
];

describe.each(solutions)('라면공장 > $name', ({fn}) => {
  describe('General cases', () => {
    it('최소 공급 횟수를 반환한다', () => {
      expect(fn(4, [4, 10, 15], [20, 5, 10], 30)).toBe(2);
    });
    it('처음에 왕창 공급받고, 이후 공급 한참 못받는 케이스도 만족해야한다.', () => {
      expect(fn(4, [1, 2, 3], [20, 1, 1], 26)).toBe(3);
    });
  });
});
