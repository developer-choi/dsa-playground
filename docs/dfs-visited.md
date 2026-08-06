# DFS에서 visited 다루기

`visited` 를 **언제 써야 하는지**는 [dfs.md](./dfs.md)에서 다룬다.
이 문서는 쓰기로 정한 뒤, 그 `if` 두 개가 무엇을 막는지와 쓰다가 어디서 틀리는지를 다룬다.

기준이 되는 코드는 이것이다.

```ts
const visited: number[] = [start];
const nextTraversingList: number[] = [...graph[start]];

while (nextTraversingList.length > 0) {
  const visitedNode = nextTraversingList.pop()!;

  if (!visited.includes(visitedNode)) {        // if 1
    visited.push(visitedNode);
  }

  for (const toVisitNode of graph[visitedNode]) {
    if (!visited.includes(toVisitNode)) {      // if 2
      nextTraversingList.push(toVisitNode);
    }
  }
}
```

## 한 줄 요약 — 그래서 언제 어느 게 필요한가

| | 이 조건이면 필요 | 빼면 |
|---|---|---|
| **`if 1`** (꺼낼 때) | 그래프에 **사이클**이 있다 | 답이 틀린다 — 같은 노드가 결과에 두 번 들어간다 |
| **`if 2`** (넣을 때) | 인접 리스트를 **양방향**으로 적었다 (되돌아가는 화살표가 있다) | 끝나지 않는다 |
| **`if 2`** (넣을 때) | **길이 합쳐진다** — 서로 다른 두 노드가 같은 노드를 가리킨다 | 답은 맞지만 층마다 두 배씩 느려진다 |

뒤집으면 이렇다.

- 사이클이 없으면 `if 1` 은 빼도 결과가 같다. **무방향 트리는 사이클이 없다** — 왕복은 같은 간선을 두 번 쓰는 것이라 고리가 아니다.
- 단방향으로만 적었고 길도 안 합쳐지면 `if 2` 도 필요 없다. 그게 [dfs.md](./dfs.md) 맨 위의 `pop` / `push` 두 줄짜리 골격이다.

**실전에서는 둘 다 넣는다.** 이 표는 "왜 넣는지"를 알기 위한 것이지, 조건을 따져 빼라는 뜻이 아니다.
아래는 이 표가 왜 이렇게 나오는지를 따라가는 내용이다.

## 두 개의 if는 무슨 일을 하나

둘 다 목표는 같다 — **각 노드를 딱 한 번씩만 순회하기.** 그런데 지키는 방식이 다르다.

- **`if 1` (꺼낼 때)** — 이미 방문한 곳을 또 결과에 넣지 않기 위해
- **`if 2` (넣을 때)** — 다음에 방문할 목록을 고를 때, 이미 방문한 노드를 빼기 위해

이 이해가 맞다. 다만 여기서 자연스럽게 드는 의문이 있다.
**`if 2` 에서 이미 걸렀는데, 왜 `if 1` 이 또 필요한가?**

### 넣을 때와 꺼낼 때 사이에 시간이 흐른다

`if 2` 는 **스택에 넣는 시점**에 판단한다. 그런데 그 노드가 실제로 꺼내지는 건 한참 뒤다.
넣을 때는 "아직 안 갔음"이 맞았어도, **꺼낼 때는 이미 갔을 수 있다.**

삼각형 그래프로 따라가 보자.

```js
{1: [2, 3], 2: [1, 3], 3: [1, 2]}
```

```
스택 [1]          visited []
1을 꺼냄       →  visited [1],  2와 3을 넣음        스택 [2, 3]
3을 꺼냄       →  visited [1,3]
                  3의 이웃은 [1, 2].
                  1은 visited에 있으니 건너뜀.
                  2는? visited에 없다. 스택에만 있다. → 또 넣는다   스택 [2, 2]
2를 꺼냄       →  visited [1,3,2]
2를 꺼냄       →  ← 여기. 이미 방문한 2가 또 나온다
```

`2` 가 스택에 두 번 들어갔다. `if 2` 는 `visited` 만 보는데, 그 시점의 `2` 는 **스택 안에 있을 뿐 아직 `visited` 에는 없었다.** 그래서 통과해버린다.

`if 1` 이 없으면 이 두 번째 `2` 가 그대로 결과에 들어가 `[1, 3, 2, 2]` 가 된다.

### 둘은 서로 다른 것을 막고 있다

하나씩 지우고 그래프 종류별로 돌려보면 이렇게 갈린다.

| 그래프 | `if 1` 지우면 | `if 2` 지우면 |
|---|---|---|
| 무방향 트리 | 결과 같음 | **무한** |
| DAG (길이 합쳐지는) | 결과 같음 | 느려짐 (답은 맞음) |
| 사이클 있음 | **답 틀림** (`1,3,2,2`) | **무한** |

- **`if 1` 은 사이클을 막는다.** 사이클이 없으면 없어도 결과가 같다.
  (DAG 44,407건 · 무방향 트리 43,838건 비교, 불일치 0건. 무방향 일반 44,378건 중 34,949건 불일치.)
- **`if 2` 는 되돌아가는 화살표를 막는다.** 사이클이 없어도 무방향이면 필수다.

무방향 트리를 보면 둘이 다른 기준이라는 게 드러난다.
사이클이 없으니 `if 1` 은 빼도 되지만, 부모-자식을 왕복하므로 `if 2` 를 빼면 끝나지 않는다.

### if 2가 없으면 왜 안 끝나는가

`if 1` 이 막는 건 **기록**뿐이다. 이미 방문한 노드를 꺼내도 **이웃을 도는 `for` 는 그대로 돈다.**
그래서 이미 다 본 노드의 이웃들이 스택에 계속 다시 쌓인다.

### 참고 — if 1을 쓰는 다른 방식

`if 1` 은 두 가지로 쓸 수 있다. **둘 다 맞고, 결과도 같다.**

```ts
// 방식 A — 기록만 건너뛴다 (이 문서에서 쓰는 방식)
const visitedNode = nextTraversingList.pop()!;

if (!visited.includes(visitedNode)) {
  visited.push(visitedNode);
}

for (const toVisitNode of graph[visitedNode]) { ... }   // 이 for는 그대로 돈다
```

```ts
// 방식 B — continue 로 아예 건너뛴다
const visitedNode = nextTraversingList.pop()!;

if (visited.includes(visitedNode)) continue;            // 이웃도 안 본다
visited.push(visitedNode);

for (const toVisitNode of graph[visitedNode]) { ... }
```

무방향 그래프 **99,373건**으로 비교해서 결과 불일치 0건이다. 어느 쪽으로 짜도 된다.

차이는 두 군데다.

- **헛일** — 방식 A는 이미 방문한 노드를 꺼내도 이웃 목록을 한 번 더 훑는다. 방식 B는 안 훑는다.
- **`if 2` 를 뺐을 때** — 방식 A는 무한 루프에 빠지고, 방식 B는 멀쩡하다.

```
방식 B + if 2 없음  →  1, 3, 2      (정상)
방식 A + if 2 없음  →  1, 3, 2, …   (무한)
```

`if 2` 를 항상 넣는다면 차이는 헛일뿐이다.

## 미끄러지는 곳

### 기록하는 줄을 for 안에 넣으면 안 된다

실제로 이렇게 옮겼다가 테스트 6개 중 5개가 깨졌다.

```ts
// 잘못됨 — 기록이 for 안에 있다
for (const toVisitNode of graph[visitedNode]) {
  if (!visited.includes(toVisitNode)) {
    visited.push(visitedNode);          // ← 이 줄
    nextTraversingList.push(toVisitNode);
  }
}
```

```
나온 값: 1, 9, 5, 5, 6, 2, 3
기대값:  1, 9, 10, 5, 8, 6, 7, 2, 3, 4
```

`for` 안에 두면 **한 노드가 기록되는 횟수가 "그 노드의 안 가본 이웃 수"만큼**이 된다.

- 안 가본 이웃이 **0개**인 노드 → 한 번도 안 찍힌다. `10`, `8`, `7`, `4` 가 통째로 사라진 이유.
- 안 가본 이웃이 **2개**인 노드 → 두 번 찍힌다. `5` 가 중복된 이유.

방문 기록은 **이웃이 몇 개든 상관없는 일**이다. 꺼낸 그 순간, 딱 한 번.

```ts
// 맞음 — 꺼낸 직후, for 밖
const visitedNode = nextTraversingList.pop()!;

if (!visited.includes(visitedNode)) {
  visited.push(visitedNode);
}

for (const toVisitNode of graph[visitedNode]) { ... }
```

### visited 하나가 두 가지 일을 하고 있다

위 코드에서 `visited` 는 두 역할을 겸한다.

- **결과** — 마지막에 `return visited` 로 반환하는 방문 순서
- **판정** — `visited.includes(...)` 로 "여기 왔었나?"를 확인하는 기준

겸하고 있으니 **기록 위치를 옮기는 순간 판정 기준까지 같이 흔들린다.**
위 사고가 그거다. "결과에 언제 넣을까"를 만졌을 뿐인데 "여기 왔었나"의 답까지 바뀌어서, 이웃을 고르는 `if 2` 가 엉뚱하게 동작했다.

나누면 그런 일이 없다. 같은 코드를 두 통으로 나눠 쓰면 이렇게 된다.

```ts
const visited = new Set<number>([start]);   // 판정용 — 여기 왔었나?
const order: number[] = [start];            // 결과용 — 방문 순서
const nextTraversingList: number[] = [...graph[start]];

while (nextTraversingList.length > 0) {
  const visitedNode = nextTraversingList.pop()!;

  if (!visited.has(visitedNode)) {
    visited.add(visitedNode);
    order.push(visitedNode);
  }

  for (const toVisitNode of graph[visitedNode]) {
    if (!visited.has(toVisitNode)) {
      nextTraversingList.push(toVisitNode);
    }
  }
}

return order;
```

나누면 성능도 같이 해결된다. `visited` 가 배열이면 `includes` 가 매번 처음부터 훑는다.
노드가 10만 개면 이것만으로 시간 초과가 난다. `Set` 의 `has` 는 한 번에 확인한다.
(노드가 1번부터 연속 번호면 `boolean[]` 도 같은 효과다.)
