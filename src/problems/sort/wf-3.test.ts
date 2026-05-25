import {sort} from './wf-3';
import {compareFunctionsWithRandomInputs} from '@/utils/jest';


const solutions = [
  {name: 'sort', fn: sort},
];

describe.each(solutions)('등수 매기기 > $name', ({fn}) => {
  describe('General cases', () => {
    it('각 학생의 등수를 반환하며 동점자는 같은 등수를 가진다', () => {
      expect(fn([4, 3, 2, 1])).toEqual([1, 2, 3, 4]);
    });

    it('같은 점수가 있으면 등수도 똑같이 나와야한다.', () => {
      expect(fn([4, 4, 3])).toEqual([1, 1, 3]);
    });
  });

  describe('Boundary cases', () => {
    it('모두 같은 점수면 모두 1등으로 나와야한다.', () => {
      expect(fn([1, 1, 1])).toEqual([1, 1, 1]);
    });
  });

  describe('Edge cases', () => {
    it('빈배열이면 빈배열이 반환되야한다.', () => {
      expect(fn([])).toEqual([]);
    });
  });

  describe('Random', () => {
    test('랜덤 입력으로 정답과 동일한지 검증한다', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: ([grades]) => fn(grades),
        answerFunction: ([grades]) =>
          grades.map(g => grades.filter(other => other > g).length + 1),
        generateInput: () => {
          const n = Math.floor(Math.random() * 40) + 10;
          const grades = Array.from({length: n}, () => Math.floor(Math.random() * 10) + 1);
          return [[grades]] as const;
        },
        iterationCount: 1000,
      });
    });
  });
});
