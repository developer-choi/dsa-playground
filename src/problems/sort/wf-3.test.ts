import { sort } from './wf-3';
import { compareFunctionsWithRandomInputs } from '@/utils/jest';

const solutions = [
  { name: 'sort', fn: sort },
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

  describe('Random', () => {
    test('랜덤 입력으로 정답과 동일한지 검증한다', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: ([grades]) => fn(grades),
        answerFunction: ([grades]) =>
          grades.map(g => grades.filter(other => other > g).length + 1),
        generateInput: () => {
          const n = Math.floor(Math.random() * 40) + 10;
          const grades = Array.from({ length: n }, () => Math.floor(Math.random() * 10) + 1);
          return [[grades]] as const;
        },
        iterationCount: 1000,
      });
    });
  });
});
