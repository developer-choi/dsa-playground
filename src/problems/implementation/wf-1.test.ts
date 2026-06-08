import { simulation } from './wf-1';
import { compareFunctionsWithRandomInputs } from '@/utils/jest';

const solutions = [
  { name: 'simulation', fn: simulation },
];

describe.each(solutions)('아파트 관리비 > $name', ({ fn }) => {
  describe('General cases', () => {
    it('1월 1일이 일요일(6)이고 k가 1일 때 주말 여부를 반환한다', () => {
      expect(fn(6, 1)).toEqual([1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0]);
    });

    it('1월 1일이 일요일(6)이고 k가 25일 때 주말 여부를 반환한다', () => {
      expect(fn(6, 25)).toEqual([0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0]);
    });
  });

  describe('Boundary cases', () => {
    it('day가 경계값인 0인 경우에도 주말 여부를 잘 반환해야 한다', () => {
      expect(fn(0, 15)).toEqual(answer(0, 15));
    });

    it('day가 경계값인 6인 경우에도 주말 여부를 잘 반환해야 한다', () => {
      expect(fn(6, 15)).toEqual(answer(6, 15));
    });

    it('k가 경계값인 1인 경우에도 주말 여부를 잘 반환해야 한다', () => {
      expect(fn(3, 1)).toEqual(answer(3, 1));
    });

    it('k가 경계값인 28인 경우에도 주말 여부를 잘 반환해야 한다', () => {
      expect(fn(3, 28)).toEqual(answer(3, 28));
    });
  });

  describe('Edge cases', () => {
  });

  describe('Random', () => {
    test('랜덤 입력으로 정답과 동일한지 검증한다', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: (day, k) => fn(day, k),
        answerFunction: (day, k) => answer(day, k),
        generateInput: () => {
          const day = Math.floor(Math.random() * 7); // 0 ~ 6
          const k = Math.floor(Math.random() * 28) + 1; // 1 ~ 28
          return [day, k] as const;
        },
        iterationCount: 1000,
      });
    });
  });
});

function answer(day: number, k: number): number[] {
  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const result: number[] = [];
  let accumulatedDays = 0;
  for (let m = 0; m < 12; m++) {
    const targetDayOffset = accumulatedDays + k - 1;
    const currentDayOfWeek = (day + targetDayOffset) % 7;
    if (currentDayOfWeek === 5 || currentDayOfWeek === 6) {
      result.push(1);
    } else {
      result.push(0);
    }
    accumulatedDays += months[m];
  }
  return result;
}