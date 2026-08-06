# DFS (깊이 우선 탐색)

한 갈래를 끝까지 파고든 뒤, 막히면 돌아와 다음 갈래로 간다.
BFS와의 비교는 [dfs-bfs.md](./dfs-bfs.md), 그래프 자체는 [graph.md](./graph.md).

```ts
const visited: number[] = [start];
const nextTraversingList: number[] = [...graph[start]];

while (nextTraversingList.length > 0) {
  const visitedNode = nextTraversingList.pop()!;

  visited.push(visitedNode);

  for (const toVisitNode of graph[visitedNode]) {
    nextTraversingList.push(toVisitNode);
  }
}
```

꺼내고, 이웃을 넣고, 끝. **DFS는 이게 전부다.**

"단방향 그래프 순회법"과 "무방향 그래프 순회법"이 따로 있는 게 아니다.
순회 코드는 위 하나뿐이고, 여기에 **`if` 가 붙느냐 마느냐**만 갈린다.

이 문서는 **언제 `if` 를 붙여야 하는가**를 다룬다.
붙이기로 정한 뒤 그 `if` 가 어떻게 동작하는지는 [dfs-visited.md](./dfs-visited.md).

## 두 코드는 같은 코드다

무방향 인접 리스트를 순회할 때 짠 코드는 이렇게 생겼다.

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

복잡해 보이지만 **위 골격과 같은 코드다.** 꺼내고(`pop`), 기록하고, 이웃을 넣는다(`push`).
달라진 건 `if` 두 개가 얹힌 것뿐이고, 그 둘이 하는 일은 하나다 — **"여기 아까 왔었나?"를 물어보는 것.**

`visited` 라는 통을 하나 두고, 거기 있는지 확인해서 있으면 건너뛴다.
골격에는 이 통도 없고 물어보지도 않는다.

그럼 언제 이 `if` 들을 얹어야 하는가. 그게 다음 절이다.

## 얹어야 하는지는 질문 하나로 정해진다

> **같은 노드에 두 번 닿을 수 있는가?**

닿을 수 없으면 골격 그대로 끝이다. 닿을 수 있으면 걸러내야 한다.

인접 리스트를 보면 안다. 두 번 닿게 만드는 원인은 **두 가지뿐이다.**

### 원인 1 — 되돌아가는 화살표가 있다

```js
{
  1: [2],
  2: [1],   // 2에서 1로 되돌아갈 수 있다
}
```

`1 → 2 → 1 → 2 …` 무한 왕복한다. 실제로 돌려보면 이렇다.

```
1,9,10,9,10,9,10,9,10, … 끝나지 않음
```

### 원인 2 — 서로 다른 노드가 같은 노드를 가리킨다

되돌아가는 화살표가 하나도 없어도(= 전부 아래로만 향해도) 이런 모양이면 두 번 닿는다.

```
    1
   / \
  2   3
   \ /
    4      1→2→4 와 1→3→4, 두 길로 4에 닿는다
   / \
  5   6
   \ /
    7
```

```js
{
  1: [2, 3],
  2: [4],
  3: [4],   // 2도 4를 가리키고 3도 4를 가리킨다
  ...
}
```

무한 루프는 안 난다. 끝나긴 한다. 그런데 **같은 노드를 몇 번이고 다시 본다.**

```
1,3,4,6,7,5,7,2,4,6,7,5,7
방문 횟수 13  (노드는 7개)
```

층이 쌓일수록 두 배씩 불어난다.

이렇게 **되돌아가는 고리가 없는** 유방향 그래프를 **DAG**라고 부른다.
주의할 점은 DAG가 "길이 합쳐진다"는 뜻은 아니라는 것이다. 일렬로 쭉 내려가기만 하는 그래프도 DAG다.
고리가 없으니 무한 루프는 안 나는데, 그 안에서 길이 합쳐지면 위처럼 같은 노드를 여러 번 보게 된다.
사이클·DAG 같은 용어는 [graph.md](./graph.md)의 「사이클」 참고.

## 원인별 대처

| 인접 리스트 상태 | 코드 |
|---|---|
| 두 원인 다 없음 | `if` 없음. `pop` / `push` 두 줄 |
| 원인 1만 있고, 그림이 트리 | 부모 비교 하나 |
| 그 외 (원인 2가 있거나, 고리가 있음) | `visited` |

### 두 원인 다 없을 때

방향이 아래로만 향하고 길도 안 합쳐지는 그래프. 맨 위 골격 그대로 쓴다.

### 원인 1만 있고 그림이 트리일 때

무방향 트리에서 되돌아갈 수 있는 곳은 **직전에 온 곳 하나뿐**이다.
`visited` 통을 만들 필요 없이 부모만 비교하면 된다.

```ts
const visited: number[] = [start];
const nextTraversingList: [number, number][] = graph[start].map(child => [child, start]);

while (nextTraversingList.length > 0) {
  const [visitedNode, parent] = nextTraversingList.pop()!;

  visited.push(visitedNode);

  for (const toVisitNode of graph[visitedNode]) {
    if (toVisitNode !== parent) {
      nextTraversingList.push([toVisitNode, visitedNode]);
    }
  }
}
```

`visited` 통이 아예 없다. 대신 "직전에 온 곳"을 노드와 함께 스택에 담아 다닌다.

### 그 외 — visited

위 「두 코드는 같은 코드다」의 코드가 이 경우다.
두 `if` 가 각각 무엇을 막는지, 쓰다가 어디서 틀리는지는 [dfs-visited.md](./dfs-visited.md).

## 인접 리스트를 만들 때 이미 정해진다

위 두 원인은 순회 코드를 짜기 전에 이미 결정돼 있다.
**인접 리스트를 어떤 모양으로 만들었느냐**에서 결정된다.

같은 그림을 두 가지로 적을 수 있다.

```js
// 단방향 — 자식만 적는다
const graph = {
  1: [2, 5, 9],
  2: [3],
  3: [4],
  4: [],
  5: [6, 8],
  6: [7],
  7: [],
  8: [],
  9: [10],
  10: [],
};
```

```js
// 양방향 — 자식이 부모를 다시 가리킨다
const graph = {
  1: [2, 5, 9],
  2: [1, 3],      // 1이 들어 있다
  3: [2, 4],      // 2가 들어 있다
  4: [3],
  5: [1, 6, 8],
  6: [5, 7],
  7: [6],
  8: [5],
  9: [1, 10],
  10: [9],
};
```

**그림은 똑같은 트리다.** 다른 건 자식 쪽에 부모 번호가 들어 있느냐뿐이다.
들어 있으면 되돌아갈 수 있게 되고(원인 1), 그 순간 `visited` 가 필요해진다.
없으면 아래로만 흐르고, `pop` / `push` 두 줄로 끝난다.

두 그래프를 같은 코드로 돌리면 결과가 같다.
1번에서 시작하면 양쪽 다 `1, 9, 10, 5, 8, 6, 7, 2, 3, 4`.
단방향 쪽은 `if` 없이, 양방향 쪽은 `if` 두 개로 그 결과를 낸다.

그럼 언제 부모 번호를 빼도 되나. 두 가지를 다 봐야 한다.

- **입력이 방향을 주는가?**
  `[상위, 하위]` 처럼 누가 위인지 적혀 있으면 뺄 수 있다.
  친구 관계처럼 방향이 없는 입력이면 양쪽에 다 넣을 수밖에 없다.
- **한 방향으로만 움직여도 답이 나오는가?**
  루트에서 시작해 아래로만 내려가면 되는 문제라면 뺄 수 있다.
  말단 노드에서 시작해 전체를 순회해야 한다면, 위로 올라갈 길이 반드시 있어야 하므로 뺄 수 없다.

## 스택에 무엇을 담나

노드 번호만 담으면 "각 노드를 한 번씩 보기"까지만 된다.
경로 길이·깊이·좌표처럼 **어느 길로 왔느냐에 따라 달라지는 값**이 필요하면, 그 값을 노드와 함께 담는다.

```ts
stack.push([next, acc + name.length]);   // 노드 + 그 경로의 누적값
```

이런 값을 바깥의 공유 변수에 두면 갈래를 되돌아 나올 때 값을 원래대로 돌려놔야 하는데,
스택 구현에서는 "언제 되돌아 나왔는지"를 알 수 없어 이 되돌리기가 매우 까다롭다.
함께 담으면 넣는 순간 그 노드의 몫이 확정되므로 되돌릴 것이 없다.

바깥에 별도 자료구조로 관리하면서 매번 복사하는 것이 최악이다 — 노드마다 복사가 일어나 O(N²)이 된다.

## 사례

### [pg-43165 타겟 넘버](../src/problems/dfs-bfs/pg-43165.ts)

모든 원소에 +/-를 붙여 target을 만드는 경우의 수를 구해야 한다.
수학 공식이 안 보인다 → 모든 경우를 직접 따질 수밖에 없다.
각 원소는 "더한다 / 뺀다" 2갈래 → 원소마다 분기 2개가 뻗어나간다.

### [무방향 인접 리스트 순회](../src/problems/dfs-bfs/basic/adjacency-list-dfs.ts)

그림은 트리인데 인접 리스트를 양방향으로 적었다 → 원인 1 → `visited` 필요.

### [단방향 인접 리스트 순회](../src/problems/dfs-bfs/basic/directed-adjacency-list-dfs.ts)

같은 그림을 아래 방향으로만 적었다 → 두 원인 다 없음 → `if` 없이 `pop` / `push` 두 줄.

**결과는 둘이 똑같다.** 1번에서 시작하면 양쪽 다 `1, 9, 10, 5, 8, 6, 7, 2, 3, 4`.
