# Array

## TODO

- [심화질문](https://www.notion.so/d3ceaae500eb4164ae46b87c18aea257)

## 배열 2개 동시에 순회하기

```ts
for (let i = 0; i < pathA.length && i < pathB.length; i++) {
  if (pathA[i] !== pathB[i]) {
    return pathA[i - 1];
  }
}
```

## JS 배열/객체 연산 3카테고리 — "새 컬렉션을 만드나?" 자문 습관

**"이 한 줄이 새 컬렉션을 만드나? 기존 걸 바꾸나? 그냥 읽고 지나가나?"**

### 그룹 1 — 순회만 (안전)

`for`, `for...of`, `forEach`, `map`, `filter`, `reduce`, `some`, `every`, `find`, `findIndex`, `indexOf`, `includes`. 단독 O(N), 반복문 안에서도 합리적 사용은 OK.

### 그룹 2 — 제자리 변경 (대부분 안전)

`push` O(1), `pop` O(1), `arr[i]=x` O(1), `sort` O(N log N), `reverse` O(N), `splice` O(N). 누적은 무조건 `push`.

### 그룹 3 — 새 컬렉션 생성 (반복문 안에서 폭탄) ★

| 연산 | 단독 | 반복문 안 |
|---|---|---|
| `[x, ...arr]`, `[...arr, x]` | O(N) | **O(N²)** |
| `arr.slice()` | O(N) | **O(N²)** |
| `arr.concat(other)` | O(N) | **O(N²)** |
| `Array.from(arr)` | O(N) | **O(N²)** |
| `arr.flat()` | O(N) | **O(N²)** |
| `{...obj}`, `Object.assign({}, obj)` | O(K) | **O(N×K)** |
| `arr.shift()`, `arr.unshift(x)` | **O(N)** (앞쪽 조작은 전부 밂) | **O(N²)** |
| `new Set(arr)`, `new Map(entries)` | O(N) | **O(N²)** |

- 공통 패턴: **"복사" 또는 "앞쪽 조작"**이 들어간 모든 연산.
- BFS 큐 함정: 이 표의 `arr.shift()` 행 때문에 큐를 배열 앞에서 꺼내면 안 된다 → [stack-queue.md](./stack-queue.md)의 「구현 (Array 기반 Queue)」.
- React에서 spread가 멀쩡한 이유: 이벤트당 1회 호출(경계에서 한 번)이라 단독 O(N)으로 끝남. 코테 함정은 **핫 루프 안에 박힌 경우**.
- push vs concat 참고: `git log --grep="그룹 단어 찾기"`

### spread 심화 — `[x, ...arr]`은 안 보이는 for 루프

`...arr`은 참조 복사가 아니라 arr의 모든 원소를 새 배열에 하나씩 복사하는 연산(`for (const e of arr) newArr.push(e)`의 단축 표기). 반복문 안에서 누적 배열에 쓰면 노드 N개 × 평균 깊이 D = **O(N×D)**, 사슬 트리 최악 O(N²).

```ts
// ❌ 트리 DFS 중 조상 체인 들고 다니기 → 깊이 D만큼 복사
parents[child] = [node, ...parents[node]];
```

```ts
// ✅ 누적값을 숫자 하나로 압축 → O(1)
stack.push([child, len + 1 + dirname[child - 1].length]);
```

멘탈 모델: **"`...`는 안 보이는 for 루프"** + **"방문 시 들고 다닐 정보를 최소 단위(숫자)로 압축하라."** 조상 명단 대신 누적 길이만 들고 가면 O(D) → O(1).

같은 코드를 문자열 쪽에서 본 이야기는 [string.md](../technique/string.md)의 「핵심 격언」에 있다. 여기가 "복사 연산이 루프다"라면, 그쪽은 "형제들이 공유하는 앞부분을 K번 되풀이해 만든다"는 다른 각도다.
