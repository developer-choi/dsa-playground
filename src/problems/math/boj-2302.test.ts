import {dp} from './boj-2302';
import {compareFunctionsWithRandomInputs} from '@/utils/vitest';

const solutions = [
  {name: 'dp', fn: dp},
];

describe.each(solutions)('극장 좌석 > $name', ({fn}) => {
  describe('General cases', () => {
    it('문제에서 제시한 예시는 만족해야한다.', () => {
      expect(fn(9, [4, 7])).toBe(12);
    });
  });

  describe('Boundary cases', () => {
    it('VIP 좌석이 서로 딱붙어 있는 경우에도 잘 동작해야한다.', () => {
      expect(fn(4, [2, 3])).toBe(1);
    });

    it('VIP 좌석이 없는 경우에도 잘 동작해야한다.', () => {
      expect(fn(4, [])).toBe(5);
    });

    it('전체 좌석수가 1개여도 잘 동작해야한다.', () => {
      expect(fn(1, [])).toBe(1);
      expect(fn(1, [1])).toBe(1);
    });

    it('전체 좌석수가 0개여도 잘 동작해야한다.', () => {
      expect(fn(0, [])).toBe(1);
    });

    it('첫 VIP 좌석이 첫 좌석인 경우에도 잘 동작해야한다.', () => {
      expect(fn(4, [1])).toBe(3);
    });

    it('마지막 VIP 좌석이 마지막 좌석인 경우에도 잘 동작해야한다.', () => {
      expect(fn(4, [4])).toBe(3);
    });

    it('마지막 VIP 좌석 이후 남아있는 좌석 구간이 길어도 정확히 배치 수를 계산해야 한다.', () => {
      expect(fn(7, [2])).toBe(8);
    });
  });

  describe('Random', () => {
    test('랜덤 입력으로 정답과 동일한지 검증한다', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: (seatCount, vipSeats) => fn(seatCount, vipSeats),
        answerFunction: naiveSeatCount,
        generateInput: randomSeatInput,
        iterationCount: 1000,
      });
    });
  });
});

function randomSeatInput(): [number, number[]] {
  const seatCount = Math.floor(Math.random() * 20) + 1;
  const vipCount = Math.floor(Math.random() * (seatCount + 1));
  const available = Array.from({length: seatCount}, (_, k) => k + 1);
  const vipSeats: number[] = [];

  for (let i = 0; i < vipCount; i++) {
    const index = Math.floor(Math.random() * available.length);
    vipSeats.push(available[index]);
    available.splice(index, 1);
  }

  return [seatCount, vipSeats.sort((a, b) => a - b)];
}

function naiveSeatCount(seatCount: number, vipSeatArray: number[]): number {
  if (seatCount <= 0) return 1;
  const fib = [1, 1];
  for (let i = 2; i <= seatCount; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  let ans = 1;
  let prev = 0;
  for (const vip of vipSeatArray) {
    const len = vip - prev - 1;
    if (len > 0) ans *= fib[len];
    prev = vip;
  }
  const lastLen = seatCount - prev;
  if (lastLen > 0) ans *= fib[lastLen];
  return ans;
}
