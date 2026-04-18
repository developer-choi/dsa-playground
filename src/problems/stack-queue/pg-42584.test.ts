import { stack } from './pg-42584';
import { compareFunctionsWithRandomInputs } from '@/utils/jest';

const solutions = [
  { name: 'stack', fn: stack },
];

describe.each(solutions)('주식가격 > $name', ({ fn }) => {
  describe('General cases', () => {
    it('각 가격에서 가격이 떨어지지 않은 기간을 반환한다', () => {
      expect(fn([1, 2, 3, 2, 3])).toEqual([4, 3, 1, 1, 0]);
    });
  });

  describe('Boundary cases', () => {
    it('오름차순 후 급락하면 [3, 2, 1, 0]을 반환한다', () => {
      expect(fn([2, 3, 4, 1])).toEqual([3, 2, 1, 0]);
    });
    it('모든 가격이 동일하면 [3, 2, 1, 0]을 반환한다', () => {
      expect(fn([3, 3, 3, 3])).toEqual([3, 2, 1, 0]);
    });
    it('오름차순이면 [3, 2, 1, 0]을 반환한다', () => {
      expect(fn([1, 2, 3, 4])).toEqual([3, 2, 1, 0]);
    });
    it('내림차순이면 [1, 1, 1, 0]을 반환한다', () => {
      expect(fn([4, 3, 2, 1])).toEqual([1, 1, 1, 0]);
    });
    it('원소가 1개면 [0]을 반환한다', () => {
      expect(fn([1])).toEqual([0]);
    });
  });

  describe('Edge cases', () => {
    it('빈 배열이면 빈 배열을 반환한다', () => {
      expect(fn([])).toEqual([]);
    });
  });

  describe('Random', () => {
    test('랜덤 입력으로 정답과 동일한지 검증한다', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: fn,
        answerFunction: (prices: number[]) => {
          const answer = new Array(prices.length).fill(0);
          for (let i = 0; i < prices.length; i++) {
            for (let j = i + 1; j < prices.length; j++) {
              answer[i]++;
              if (prices[j] < prices[i]) break;
            }
          }
          return answer;
        },
        generateInput: () => {
          const length = Math.floor(Math.random() * 41) + 10; // 10~50
          const prices = Array.from({length}, () => Math.floor(Math.random() * 10000) + 1);
          return [prices] as [number[]];
        },
        iterationCount: 1000,
      });
    });
  });
});
