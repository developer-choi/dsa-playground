# scaffold 결과물 예시

`scaffold.md` 절차로 https://www.acmicpc.net/problem/11047 을 셋업했을 때 생성되는 파일들.

**주의**: 아래 테스트 파일의 `Random` 블록과 `compareFunctionsWithRandomInputs` import는 4단계(풀이 작성)에서 추가되는 **완성 상태** 예시다. 초기 스캐폴딩 시점에는 포함하지 않는다 — 풀이 함수 import 하나만.

## src/problems/greedy/boj-11047.ts

```typescript
/**
 * URL: https://www.acmicpc.net/problem/11047
 * Description: 동전 0 — N종류의 동전으로 K원을 만드는 데 필요한 동전 개수의 최솟값
 */

export function greedy(coins: number[], k: number): number {
  /*
   * 접근법 — 목적/방법의 연쇄로 순서대로 서술.
   *
   * 형식: "X를 하고 싶다 → 그러려면 Y가 필요하다 ..."
   * 각 단계가 바로 앞 단계에서 논리적으로 도출되어야 함. 직감 점프 금지.
   *
   * Tip: 무엇을 원해서 그 알고리즘을 선택했고, 그 자료구조를 선택했고,
   *      그 자료구조에 어떤 규칙으로 데이터를 저장했는지 적는다.
   */

  // TODO
  return 0;
}
```

## src/problems/greedy/boj-11047.test.ts

```typescript
import { greedy } from './boj-11047';
import { compareFunctionsWithRandomInputs } from '@/utils/vitest';

const solutions = [
  {name: 'greedy', fn: greedy},
];

describe.each(solutions)('동전 0 > $name', ({fn}) => {
  describe('General cases', () => {
  });

  describe('Boundary cases', () => {
  });

  describe('Edge cases', () => {
  });

  describe('Random', () => {
    test('랜덤 입력으로 정답과 동일한지 검증한다', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: ([coins, k]) => fn(coins, k),
        answerFunction: minCoinCountByDp,
        generateInput: randomCoinsAndK,
        iterationCount: 1000,
      });
    });
  });
});

// K 상한은 1억인데 DP 정답 함수가 O(K)라 감당하지 못한다. 2,000까지만 덮었다.
function randomCoinsAndK(): [[number[], number]] {
  const coins = [1];

  while (coins.length < 6 && Math.random() < 0.8) {
    coins.push(coins.at(-1)! * (Math.floor(Math.random() * 3) + 2));
  }

  return [[coins, Math.floor(Math.random() * 2000) + 1]];
}

function minCoinCountByDp([coins, k]: [number[], number]): number {
  const counts = new Array<number>(k + 1).fill(Infinity);
  counts[0] = 0;

  for (let amount = 1; amount <= k; amount++) {
    for (const coin of coins) {
      if (coin <= amount) {
        counts[amount] = Math.min(counts[amount], counts[amount - coin] + 1);
      }
    }
  }

  return counts[k];
}
```
