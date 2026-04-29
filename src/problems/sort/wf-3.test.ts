import { solution } from './wf-3';

const solutions = [
  { name: 'sort', fn: solution },
];

describe.each(solutions)('등수 매기기 > $name', ({ fn }) => {
  describe('General cases', () => {
    it('각 학생의 등수를 반환하며 동점자는 같은 등수를 가진다', () => {
      expect(fn([2, 2, 1])).toEqual([1, 1, 3]);
      expect(fn([3, 2, 1, 2])).toEqual([1, 2, 4, 2]);
    });
  });

  describe('Boundary cases', () => {
  });

  describe('Edge cases', () => {
  });
});
