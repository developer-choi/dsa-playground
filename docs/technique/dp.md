# DP (동적 계획법)

여러 개의 하위 문제를 풀고 그 결과를 기록하고 이용해 문제를 해결하는 알고리즘

복잡한 문제를 간단한 여러 개의 문제로 나누어 푸는 방법

DP는 완전탐색과 다른 알고리즘이 아니다. 완전탐색이 그리는 갈래 중 **같은 것**을 한 번만 계산하고 재사용한 것이다.

## 입력 = 재귀 함수의 파라미터

[pg-43165 타겟 넘버](../../src/problems/dfs-bfs/pg-43165.ts)를 완전탐색으로 풀면 이렇다.

```ts
function internal(value: number, index: number): number {
  if (index >= numbers.length) {
    return value === target ? 1 : 0;
  }

  const left = internal(value + numbers[index], index + 1);
  const right = internal(value - numbers[index], index + 1);

  return left + right;
}
```

`numbers = [1, 1, 1]` 로 놓고 재귀를 끝까지 따라가면, 파라미터 `(value, index)` 중 **`(0, 2)` 가 두 번 나온다.** 한쪽은 `+1 -1`, 다른 쪽은 `-1 +1` 로 왔으니 **온 길이 다르다.** 그런데 자식은 양쪽 다 `(1,3)`, `(-1,3)` 으로 같다.

그래서 두 `(0, 2)` 아래는 통째로 같은 계산이니, 반복하는건 손해다. (마치 피보나치나 팩토리얼 계산처럼)

> 입력이 같으면 출력이 같다. 그러니 한 번 계산했으면 적어뒀다 다시 쓴다.

여기서 입력은 `(value, index)`, 즉 **재귀 함수의 파라미터 그 자체**다.

## 어디에 적어두나: 입력이 곧 주소

앞의 재귀에서 세 군데만 늘리면 된다. 원래 계산은 한 글자도 안 건드린다.

```ts
export function memoization(numbers: number[], target: number): number {
  // 1. 캐시 선언하고
  const cache: Record<`${number}-${number}`, number | undefined> = {};

  function internal(value: number, index: number): number {
    // 3. 캐시 HIT 하면 반환한다.
    const dataInCache = cache[`${value}-${index}`];
    if (dataInCache !== undefined) {
      return dataInCache;
    }

    if (index >= numbers.length) {
      return value === target ? 1 : 0;
    }

    const left = internal(value + numbers[index], index + 1);
    const right = internal(value - numbers[index], index + 1);
    
    // 2. 캐시를 쌓는다.
    cache[`${value}-${index}`] = left + right;
    return left + right;
  }

  return internal(0, 0);
}
```

DP를 잘 구현했는지 알아내는 방법은, 호출 수를 세보면 된다. 

## 칸이 몇 개인지 어림잡아본다.

시간복잡도에서 연산횟수가 1억을 넘어가면 다른 알고리즘을 찾아야하듯이, 공간복잡도도 러프한 기준을 잡아서, DP로 풀수 있는지를 어림잡아봐야한다.

입력 항목의 가짓수를 곱하면 칸 수다. 코드 치기 전에 이 곱셈을 한다.

| 예 | 칸 수 |
|---|---|
| `dp[n]`, n ≤ 1,000 | 1,000 |
| `dp[i][j]`, 둘 다 ≤ 3,000 | 900만 |
| 라면공장 `dp[공급일][재고]`, 20,000 × 100,000 | 20억 |

넘으면 위험한 선이다.

| | 선 |
|---|---|
| 시간 | 연산 1억 번 |
| 배열 | 1,000만 칸 (한 칸 8바이트, 메모리 제한 128MB 기준) |

**1,000만을 넘으면 DP 자체를 접는다.** 라면공장이 그렇다. 20억이라 표를 만들 수가 없고, 힙으로 매번 제일 큰 걸 꺼내 20,000 × log 20,000, 곧 28만 번으로 푼다.

## 점화식: 한 칸을 앞 칸들로 적는다

피보나치를 배열에 담으면 이렇다. 상자 하나가 한 칸이다.

```
  dp[0] dp[1] dp[2] dp[3] dp[4] dp[5] dp[6]
[   0  ,  1  ,  1  ,  2  ,  3  ,  5  ,  8   ]
```

`dp[6]` 은 `dp[5] + dp[4]`, 곧 `5 + 3` 이다. 모든 칸에 똑같이 통하는 규칙을 한 줄로 적으면 이렇게 된다.

```
dp[n] = dp[n-1] + dp[n-2]
```

**이런 식을 점화식이라고 한다.** 오른쪽에 자기가 다시 나오는 게 표시다. `f(x) = x + 1` 은 그 자리에서 답이 나오니 아니고, `f(n) = f(n-1) + 1` 은 앞으로 밀리니 맞다. 밀리기만 하면 안 끝나므로 `dp[0]`, `dp[1]` 처럼 **시작점을 따로 정해준다.** 규칙 한 줄과 시작점이 한 세트다.

> 수열에서 이웃하는 두개의 항 사이에 성립하는 관계를 나타낸 관계식
>
> [위키백과 「점화식」](https://ko.wikipedia.org/wiki/점화식). 한자 표기가 재귀식(再歸式)이다.

pg-43165 의 점화식은 이렇다.

```
dp[value][index] = dp[value + numbers[index]][index + 1]
                 + dp[value - numbers[index]][index + 1]
```

칸 주소가 둘인 건 입력이 `(value, index)` 둘이기 때문이다. 위 코드의 `left + right` 가 이 줄 그대로다.

**둘을 합칠 때 쓰는 기호는 무엇을 구하냐가 정한다.** 가짓수를 세면 `+`, 최대·최소를 구하면 `max`·`min`. 「뭘 구하는 문제냐」는 DP를 쓸지 정하는 질문이 아니라 여기서 무슨 기호를 쓸지 정하는 질문이다.

## DP는 두 가지다

| | 위에서 아래로 | 아래에서 위로 |
|---|---|---|
| 이름 | **메모이제이션** (memoization) | **타뷸레이션** (tabulation) |
| 다른 이름 | 하향식, Top-down | 상향식, Bottom-up |
| 생김새 | 재귀 + 공책 | 반복문 + 표 |
| 캐시 | 필요 | **없음** |

위 코드가 메모이제이션이다. 타뷸레이션은 재귀 없이 작은 입력부터 표를 순서대로 채우는 방식인데, 여기서는 **그런 게 있다는 것까지만** 알면 된다.

## DP 오해

완전탐색과 DP는 근본이 같고, 다른 건 **캐시로 재사용하느냐** 하나다. 재사용이 적을수록 완전탐색에 가까워지고, 아예 없으면 캐시데이터 (표)의 크기 만큼 손해다.

그래서 중요한 건 **같은 입력이 여러 경로로 다시 나오느냐**, 즉 겹치는 부분 문제다.

> 결과를 기록하는 것을 메모이제이션(Memoization) 이라고 하고, 문제를 쪼갤 수 있는 구조를 겹치는 부분 문제(Overlapping Subproblem)라고 합니다!