# wf-4 풀이 면접 대비 노트

## 면접관 첫 질문 대비 — 한 줄 자기진단

> "이 코드는 N=100,000에서 시간초과 위험이 있습니다. 당시 **트리 DFS의 누적 파라미터 패턴**을 모르고 짜서, 부모 정보를 매번 배열로 복사하는 형태가 됐습니다. 다음과 같이 개선할 수 있습니다."

**먼저 이 한 마디를 던지고** 개선안 설명 시작. 인정 + 개선 방향 제시 = 메타인지 점수.

---

## 원래 코드의 문제점 (6가지)

### ① 무방향 인접 리스트로 만듦

```typescript
graph[parent].push(children);
graph[children].push(parent);  // ← 역방향까지 저장
```

- relation은 [부모, 자식] 방향이 명시된 입력인데, 양쪽 방향 다 저장
- 메모리 2배, 사이클 가능해짐 → visited 필요해짐 → 추가 비용
- 타입도 복잡해짐: `Record<number, number[]>` + visited Set + parents 객체 3개 관리

**트리에서 단방향 판단 기준**: 입력에 "상위-하위", "부모-자식" 방향이 명시되어 있으면 단방향으로 만든다.  
`[a, b]` 형태로 방향 없이 주어지면 양방향이 불가피.

### ② visited 불필요한데 사용

```typescript
const visited = new Set<number>([1]);
// ...
if (!visited.has(grandChildren)) {
  stack.push(grandChildren);
}
```

- 트리 + 단방향이면 visited 자체가 불필요 (한 노드에 두 번 도달할 길이 없음)
- ①이 만든 부작용 — 부모로 거꾸로 갈 수 있게 만들어놨으니 visited로 막아야 했던 것

**단방향 DFS는 push/pop만으로 충분하다:**

```typescript
// visited 없이 스택 DFS — 단방향이면 이게 전부
const stack = [1];
while (stack.length) {
  const node = stack.pop()!;
  for (const next of children[node]) {
    stack.push(next);  // 자식 방향으로만 push → 역방향 도달 불가
  }
}
```

### ③ 부모 명단을 spread로 복사 → O(N²) **(치명타)**

```typescript
parents[grandChildren] = [visiting, ...parents[visiting]];
```

- spread `...arr`은 **arr의 모든 원소를 하나씩 새 배열에 복사**하는 O(N) 연산 (보이지 않는 for 루프)
- 깊이 D인 노드 처리 시마다 D개 복사 → 총 1+2+…+(N-1) = **O(N²)**
- N=100,000 사슬 트리 → 50억 번 복사 → 타임아웃

### ④ 리프마다 경로 문자열 재구성 → O(N²) **(치명타)**

```typescript
nodes.map(node => dirname[node - 1]).join('/').length
```

- 리프 K개 × 평균 경로 길이 L
- 애벌레 트리(척추 + 끝에 잎들) 최악에서 K × L = N²/4
- 길이만 필요한데 문자열을 실제로 만든 게 낭비
- 같은 prefix(공유 조상 부분)를 K번 처음부터 만듦

### ⑤ `Math.max(...allDirNames)` 사용

```typescript
return Math.max(...allDirNames);
```

- spread를 함수 인자로 펼침 → JS 엔진의 인자 개수 한계(~6.5만)에 걸리면 `RangeError`
- N=100,000이면 위험. `arr.reduce((a, b) => Math.max(a, b), 0)`로 대체해야 안전

### ⑥ 스택에 노드 번호만 넣음 (상태 미포함)

```typescript
const stack: number[] = graph[1];
```

- 본질적 결함. **스택에 노드 + 필요한 상태(누적 길이)를 묶어 넣었어야 함**
- 노드만 넣다 보니 누적값을 별도 자료구조(`parents`)로 관리하게 됐고, 그게 ③의 원인
- 트리 DFS의 표준 패턴: `stack.push({ node, 누적상태 })`

**확장 패턴 — 필요한 컨텍스트를 객체에 자유롭게 추가:**

```typescript
// 기본: 노드 + 누적 길이
stack.push({ node, len });

// 확장: 부모, 깊이, 경로까지
stack.push({ node, parent, depth, path: [...path, node] });
```

부모가 push할 때 자기 컨텍스트를 물려주고, 자식은 자기 기여만 추가한다. 분기마다 컨텍스트가 자동으로 독립 복제되므로 분기끼리 안 꼬인다.

---

## 개선 방향 (각 문제 → 해결)

### ① + ② → 단방향 인접 리스트로

```typescript
// 배드 — 무방향 + visited
graph[parent].push(children);
graph[children].push(parent);
const visited = new Set<number>([1]);

// 굿 — 단방향, visited 제거
const children: number[][] = Array.from({ length: N + 1 }, () => []);
for (const [parent, child] of relation) {
  children[parent].push(child);
}
```

**결과 그래프 데이터가 달라진다:**

```
무방향: { 1: [2,3], 2: [1,4,5], 3: [1,6], 4: [2], 5: [2], 6: [3] }
          ↑ 모든 노드가 부모도 자식도 갖고 있음. 리프도 부모 기록.

단방향: { 1: [2,3], 2: [4,5], 3: [6] }
          ↑ 자식 없는 리프는 아예 등록 불필요. 부모→자식 방향만.
```

무방향은 `visited`가 없으면 `4 → 2 → 1 → 2 → ...` 무한루프. 단방향은 자식 방향으로만 push하니까 애초에 올라갈 길이 없다.

### ③ → 부모 정보를 숫자 하나로 압축

```typescript
// 배드 — 부모 명단 통째로 복사 (O(D))
parents[grandChildren] = [visiting, ...parents[visiting]];

// 굿 — 누적 길이만 숫자로 전달 (O(1))
stack.push({ node: child, len: len + 1 + dirname[child - 1].length });
```

### ④ → 문자열 만들지 말고 길이만 누적

```typescript
// 배드 — 리프마다 경로 문자열 재구성 (O(L))
nodes.map(node => dirname[node - 1]).join('/').length

// 굿 — 길이만 더해서 들고 다님 (O(1))
len + 1 + dirname[child - 1].length
```

### ⑤ → 즉시 max 갱신

```typescript
// 배드 — RangeError 위험 (spread 펼치기 한계)
return Math.max(...allDirNames);

// 굿 — 순회 중 즉시 비교
if (len > maxLen) maxLen = len;
```

### ⑥ → 스택에 객체로 묶어 push

```typescript
// 배드 — 노드만 스택에. 누적값을 별도 자료구조로 관리하게 됨
const stack: number[] = graph[1];

// 굿 — 노드 + 상태를 한 묶음으로
const stack: StackEntry[] = [{ node: 1, len: dirname[0].length }];
```

**핵심 통찰**: **"방문 시 들고 다닐 정보를 최소 단위(숫자 하나)로 압축한다."**

---

## 최종 답안 (객체 버전)

```typescript
type StackEntry = { node: number; len: number };

export function solution(N: number, relation: [number, number][], dirname: string[]): number {
  // 1. 단방향 인접 리스트 (부모 → 자식만)
  const children: number[][] = Array.from({ length: N + 1 }, () => []);
  for (const [parent, child] of relation) {
    children[parent].push(child);
  }

  // 2. 스택에 { 노드, 그 노드까지의 누적 길이 } 객체로 push
  let maxLen = 0;
  const stack: StackEntry[] = [{ node: 1, len: dirname[0].length }];

  while (stack.length) {
    const { node, len } = stack.pop()!;

    // 3. 모든 노드에서 max 갱신 (리프만 봐도 같지만 안전하게)
    if (len > maxLen) maxLen = len;

    // 4. 자식에게 누적 길이 + '/' + 자기 이름 길이 전달
    for (const child of children[node]) {
      stack.push({
        node: child,
        len: len + 1 + dirname[child - 1].length,
      });
    }
  }

  return maxLen;
}
```

**13줄. visited 없음. 부모 명단 없음. 문자열 만들기 없음.**

---

## 왜 이게 답안인가

### 시간복잡도: O(N)

```typescript
for (const [parent, child] of relation) children[parent].push(child);  // O(N) — 간선 수만큼

while (stack.length) {
  const { node, len } = stack.pop()!;        // 각 노드 정확히 1번 pop
  if (len > maxLen) maxLen = len;            // O(1)
  for (const child of children[node]) {      // 간선 수만큼 (전체 합 O(N))
    stack.push({ node: child, len: len + 1 + dirname[child - 1].length });  // O(1)
  }
}
```

- 인접 리스트 빌드: 간선 수 N-1번 순회 → O(N)
- DFS 본체: 각 노드를 정확히 한 번 push, 한 번 pop → N회
- **노드당 작업량 O(1)** (덧셈 한 번, 비교 한 번)
- 총: **O(N)**

비교: 원래 코드는 노드당 작업량이 O(D)(부모 체인 복사)라서 O(N×D), 최악 O(N²).

### 공간복잡도: O(N)

```typescript
const children: number[][] = Array.from({ length: N + 1 }, () => []);  // O(N)
const stack: StackEntry[] = [...];                                      // 최대 O(N)
let maxLen = 0;                                                          // O(1)
```

- 인접 리스트: O(N)
- 스택 최대 크기: O(N) (트리 깊이만큼)
- 그 외 변수: O(1)

### 핵심 통찰

```typescript
stack.push({
  node: child,
  len: len + 1 + dirname[child - 1].length,
  //   ^^^                ^^^^^^^^^^^^^^^^^^^^^^^^^^
  //   부모가 들고 있던    자식 자기 기여만 추가
  //   누적값 그대로 상속  (이름 길이 + 슬래시 1)
});
```

> **부모가 이미 계산해둔 누적 길이를 자식이 그대로 받아서, 자기 기여(+1+name길이)만 더한다.**

- prefix 공유: 같은 부모의 자식들은 부모의 누적값을 시작점으로 공유
- 정보 압축: O(D)짜리 부모 명단 대신 O(1)짜리 숫자 하나
- 분기 처리: 스택에 push할 때 자식별로 누적값이 자동 복제되므로 분기끼리 안 꼬임

### 왜 visited가 필요 없나

```typescript
// 단방향이라 children[X]에는 X의 자식만 있음. 부모로 거꾸로 가는 길 자체가 없음
for (const child of children[node]) {
  stack.push({ ... });  // 자식만 push → 한 노드에 한 번만 도달
}
```

- relation이 [parent, child] 방향으로 명시 → **단방향 인접 리스트** 가능
- 트리 + 단방향 = 한 노드에 한 번만 도달 (자식에서 부모로 가는 길이 없음)
- 사이클 불가능 → visited 자체가 불필요

---

## 예상 후속 질문 답변 시나리오

### Q1. "재귀로 짜면 어떻게 되나요?"

> 재귀로 짤 수 있고 코드는 더 짧지만, **N=100,000일 때 사슬 트리에서 콜스택이 터질 위험**이 있습니다. JS 엔진의 콜스택 한계가 보통 1만 안팎이라 반복문 + 명시적 스택을 선호했습니다.

```typescript
function dfs(node, len) {
  if (len > maxLen) maxLen = len;
  for (const child of children[node]) dfs(child, len + 1 + dirname[child - 1].length);
}
dfs(1, dirname[0].length);
```

### Q2. "BFS로 풀면 어떻게 되나요?"

> 가능합니다. 시간복잡도 동일 O(N). 단 JS의 `arr.shift()`는 O(N) 연산이라, 큐가 필요하면 head 인덱스 방식으로 구현해야 합니다. 이 문제는 트리 깊이 우선/너비 우선 무관하게 모든 노드를 방문하므로 DFS/BFS 어느 쪽으로 풀어도 됩니다.

```typescript
const queue: StackEntry[] = [{ node: 1, len: dirname[0].length }];
let head = 0;  // shift() O(N) 회피

while (head < queue.length) {
  const { node, len } = queue[head++];
  if (len > maxLen) maxLen = len;
  for (const child of children[node]) {
    queue.push({ node: child, len: len + 1 + dirname[child - 1].length });
  }
}
```

### Q3. "트리가 아니라 일반 그래프면요?"

> 일반 그래프면 visited가 필수입니다. 한 노드에 여러 경로로 도달할 수 있어서 중복 방문 시 시간복잡도가 폭발합니다. 사이클이 있는 그래프면 무한 루프 방지 차원에서도 visited가 필수입니다.

```typescript
const visited = new Set<number>();
const stack: StackEntry[] = [{ node: 1, len: dirname[0].length }];

while (stack.length) {
  const { node, len } = stack.pop()!;
  if (visited.has(node)) continue;  // 중복 방문 차단
  visited.add(node);

  if (len > maxLen) maxLen = len;
  for (const next of adj[node]) {
    if (!visited.has(next)) {
      stack.push({ node: next, len: len + 1 + dirname[next - 1].length });
    }
  }
}
```

### Q4. "왜 객체로 push했나요? 튜플도 되지 않나요?"

> 튜플도 동일하게 동작합니다. 객체로 한 이유는 **가독성** — 필드 이름이 명시되어 의도가 명확합니다. 성능 차이는 사실상 없습니다. 코테에서 작성 시간이 촉박하면 튜플로 짜겠습니다.

```typescript
// 튜플 버전
const stack: [number, number][] = [[1, dirname[0].length]];
const [node, len] = stack.pop()!;

// 객체 버전
const stack: { node: number; len: number }[] = [{ node: 1, len: dirname[0].length }];
const { node, len } = stack.pop()!;
```

### Q5. "Math.max(...arr)는 왜 안 썼나요?"

> spread를 함수 인자로 펼치면 JS 엔진의 인자 개수 한계(약 6.5만)에 걸려 `RangeError`가 날 수 있습니다. N=100,000 + 가지가 많은 트리면 위험합니다.

```typescript
// 배드 — RangeError 위험
return Math.max(...allDirNames);

// 안전 — reduce
return allDirNames.reduce((a, b) => Math.max(a, b), 0);

// 베스트 — 순회 중 즉시 갱신 (배열 자체를 안 만듦)
if (len > maxLen) maxLen = len;
```

### Q6. "원래 풀이의 가장 큰 문제 한 가지만 꼽으면?"

> **스택에 노드 번호만 넣고 누적 정보를 별도 자료구조로 관리한 점**입니다. 트리 DFS의 표준 패턴은 "방문할 때 필요한 상태를 노드와 함께 스택에 묶어 넣는 것"인데, 그 패턴을 의식하지 못했습니다. 이 한 가지가 부모 명단 복사 O(N²)의 근본 원인이었습니다.

```typescript
// 원래 — 노드만. 누적값은 따로 parents 객체에 저장 (이게 문제의 시작)
const stack: number[] = graph[1];
parents[grandChildren] = [visiting, ...parents[visiting]];  // O(D) 복사

// 개선 — 노드 + 누적값을 한 묶음으로 (parents 객체 자체가 사라짐)
const stack: StackEntry[] = [{ node: 1, len: dirname[0].length }];
stack.push({ node: child, len: len + 1 + dirname[child - 1].length });  // O(1)
```

### Q7. "메모리 더 줄일 수 있나요?"

> 인접 리스트가 O(N), 스택이 O(N)이라 본질적으로 O(N) 미만은 어렵습니다. 단 인접 리스트를 만들지 않고 원본 relation을 정렬해서 사용하는 변형은 가능하지만, 가독성/시간복잡도 면에서 이득이 없어 권장하지 않습니다.

---

## 면접 직전 30초 복기

- **시간복잡도**: O(N) — 노드당 O(1) 작업
- **핵심 패턴**: "스택에 (노드, 누적 길이) 객체로 묶어 push"
- **회피한 함정**: spread 복사, 문자열 재구성, Math.max 펼치기, visited
- **한 줄 자랑**: "부모 정보를 숫자 하나로 압축해서 전달, 분기에서 자동 복제되므로 O(N)"
