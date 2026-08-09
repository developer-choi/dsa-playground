# Algorithm Tips

## 시간 복잡도 & 공간 복잡도 줄이기

### 얼마나 줄여야 하나 — 1억이 기준

**데이터 크기 × 알고리즘의 n값이 1억을 넘으면 TLE.**
데이터 크기가 10만이면 O(n²)는 100억이라 안 된다.
O(n log n) / O(n) / O(log n) / O(1) 로 풀어야 한다.

### 최대값을 구할 때 굳이 중간배열을 안만들어도 됨

순회하면서 나온 값을 배열에 다 모았다가 마지막에 `Math.max`·`reduce`·`sort`로 **하나만 뽑아 쓰는** 모양이면, 순회 도중 변수 하나를 갱신하는게 더 좋다.

```ts
// ❌ 리프마다 길이를 모아놨다가 마지막에 하나만 씀
const lengths: number[] = [];
lengths.push(pathLength);
return Math.max(...lengths);

// ✅ 순회하며 틈틈히 갱신, 배열 자체가 없어짐
maxLength = Math.max(maxLength, pathLength);
return maxLength;
```

### 순회 목표 — 1회·절반·제자리

1. 선형순환을 1번만 하는 것 (2회 이상 순회하지 않도록)
2. 절반만 순회하면 더 좋음
3. 기왕이면 Auxiliary Space 쓰지 않기

### 순회 1회로 max + 후보 동시 수집

"max 구하기 → 같은 값 필터링" 두 번 순회를 한 번으로 합치는 패턴. 새 max 발견 시 **후보 배열을 새 배열로 리셋**, 동률이면 push. 핵심은 "새 최대 등장 = 기존 후보 무효화" 라는 발상.

```ts
let maxCount = -Infinity;
let candidates: string[] = [];
for (const item of items) {
  if (item.value > maxCount) {
    maxCount = item.value;
    candidates = [item.id];   // 새 max → 후보 리셋
  } else if (item.value === maxCount) {
    candidates.push(item.id); // 동률 → 후보 추가
  }
}
```

## Math.max() / Math.min() 함정

### 빈 배열은 -Infinity

`Math.max()`에 빈 배열이 들어가면 `-Infinity`가 나온다.

### spread로 인자 펼치기 한계 — 큰 배열은 RangeError

`Math.max(...arr)`처럼 spread로 인자를 펼치면 배열 길이가 클 때 `RangeError: Maximum call stack size exceeded`가 날 수 있다.

- spread는 원소를 각각 함수 인자로 펼치는데, JS 엔진의 인자 개수 한계(V8 6.5만~수십만, JSC 약 6.5만)에 걸린다.
- 시간복잡도는 동일하지만 인터페이스 레벨 제약.
- 큰 배열은 `arr.reduce((a, b) => Math.max(a, b), -Infinity)`로 대체.
- 같은 함정: `Math.min(...arr)`, `arr.push(...big)`, `fn.apply(null, big)`.

> 멘탈 모델: **"배열을 인자로 펼치는 모든 연산은 N이 크면 위험"**.

## `||` / `&&` 단락평가

좌측값에 따라 우측이 실행되지 않을 수 있다.
조건문을 짤 때 우측 식에 부수효과(함수 호출 등)가 있다면 주의.
