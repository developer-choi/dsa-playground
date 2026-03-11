# scaffold 결과물 예시

`/scaffold https://www.acmicpc.net/problem/11047` 실행 시 생성되는 파일들.

## src/problems/greedy/boj-11047.ts

```typescript
/**
 * URL: https://www.acmicpc.net/problem/11047
 * Description: 동전 0 — N종류의 동전으로 K원을 만드는 데 필요한 동전 개수의 최솟값
 */

export function greedy(coins: number[], k: number): number {
  // TODO
}
```

## src/problems/greedy/boj-11047.test.ts

```typescript
import { greedy } from './boj-11047';
import { compareFunctionsWithRandomInputs } from '@/utils/jest';

// yarn test src/problems/greedy/boj-11047.test.ts
const solutions = [
  {name: 'Greedy', fn: greedy},
];

describe.each(solutions)('동전 0 > $name', ({fn}) => {
  describe('Success', () => {
  });

  describe('Boundary', () => {
  });

  describe('Edge', () => {
  });

  describe('Random', () => {
    it('랜덤 입력 검증', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: ([coins, k]) => fn(coins, k),
        answerFunction: ([coins, k]) => {
          // brute force: 큰 동전부터 나누기
          let count = 0;
          for (let i = coins.length - 1; i >= 0; i--) {
            count += Math.floor(k / coins[i]);
            k %= coins[i];
          }
          return count;
        },
        generateInput: () => {
          const coins = [1, 5, 10, 50, 100, 500, 1000];
          const k = Math.floor(Math.random() * 10000) + 1;
          return [[coins, k]] as const;
        },
      });
    });
  });
});
```
