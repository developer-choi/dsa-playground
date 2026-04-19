# scaffold 결과물 예시

`/scaffold https://www.acmicpc.net/problem/11047` 실행 시 생성되는 파일들.

**주의**: 아래 테스트 파일의 `Random` 블록과 `compareFunctionsWithRandomInputs` import는 2단계(접근법/테스트케이스 작성)에서 추가되는 **완성 상태** 예시다. 초기 스캐폴딩 시점에는 포함하지 않는다 — 풀이 함수 import 하나만.

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
import { compareFunctionsWithRandomInputs } from '@/utils/jest';

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
        answerFunction: ([coins, k]) => {
          // 큰 동전부터 나누기
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
