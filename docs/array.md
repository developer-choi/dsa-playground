## TODO

- [심화질문](https://www.notion.so/d3ceaae500eb4164ae46b87c18aea257)

## push vs concat 성능 차이

습관적으로 무조건 절대로 immutable을 지키려고 하는데,
매개변수가 아니라 함수안에서 만든 배열이라면 push가 훨씬 성능이 concat보다 낫다.

- `concat`: 매번 새 배열 생성 + 기존 원소 복사 → O(n) per call
- `push`: in-place 추가 → O(1) amortized

루프 안에서 쓰면 concat은 O(n²), push는 O(n).

참고: https://github.com/developer-choi/dsa-playground/commit/3ba114024da742aef2d284098663e3d7e5d9c535

## Array.prototype.slice()는 O(n)

요소들을 하나씩 복사해야 해서.

## `array.indexOf()`는 O(n)

선형 탐색이라서.

## `array.splice()`는 O(n)

요소 제거 후 내부 재배치 작업까지 수반한다. 루프 안에서 사용하면 O(n²).

## 배열 2개 동시에 순회하기

```ts
for (let i = 0; i < pathA.length && i < pathB.length; i++) {
  if (pathA[i] !== pathB[i]) {
    return pathA[i - 1];
  }
}
```
