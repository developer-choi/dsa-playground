import { solution } from './pg-42629';
import { compareFunctionsWithRandomInputs } from '../../utils/jest';

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

  describe('Random', () => {
    test('랜덤 입력으로 정답과 동일한지 검증한다', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: (stock: number, dates: number[], supplies: number[], k: number) => fn(stock, dates, supplies, k),
        answerFunction: (stock: number, dates: number[], supplies: number[], k: number) => {
          const used = new Array(dates.length).fill(false);
          let currentStock = stock;
          let count = 0;
          while (currentStock < k) {
            let maxSupply = -1;
            let maxIdx = -1;
            for (let i = 0; i < dates.length; i++) {
              if (!used[i] && dates[i] <= currentStock && supplies[i] > maxSupply) {
                maxSupply = supplies[i];
                maxIdx = i;
              }
            }
            if (maxIdx === -1) throw new Error('impossible');
            used[maxIdx] = true;
            currentStock += maxSupply;
            count++;
          }
          return count;
        },
        generateInput: () => {
          const stock = Math.floor(Math.random() * 10) + 2;
          const k = stock + Math.floor(Math.random() * 30) + 15;
          const usedDates = new Set<number>();
          const chainDates: number[] = [];
          const chainSupplies: number[] = [];
          let currentStock = stock;
          // 도달 가능한 날짜만 골라 연쇄를 구성 → solvability 보장
          while (currentStock < k) {
            let date = Math.floor(Math.random() * currentStock) + 1;
            let tries = 0;
            while (usedDates.has(date) && tries++ < 20) {
              date = Math.floor(Math.random() * currentStock) + 1;
            }
            if (usedDates.has(date)) break;
            const supply = Math.floor(Math.random() * 15) + 5;
            usedDates.add(date);
            chainDates.push(date);
            chainSupplies.push(supply);
            currentStock += supply;
          }
          // 방해용 날짜 추가
          for (let i = 0; i < 2; i++) {
            const date = Math.floor(Math.random() * (k - 1)) + 1;
            if (!usedDates.has(date)) {
              usedDates.add(date);
              chainDates.push(date);
              chainSupplies.push(Math.floor(Math.random() * 5) + 1);
            }
          }
          const combined = chainDates.map((d, i) => [d, chainSupplies[i]] as [number, number]);
          combined.sort((a, b) => a[0] - b[0]);
          return [
            stock,
            combined.map(([d]) => d),
            combined.map(([, s]) => s),
            k,
          ] as [number, number[], number[], number];
        },
        iterationCount: 1000,
      });
    });
  });
});
