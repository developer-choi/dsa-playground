# DFS에서 visited 다루기

`visited` 를 **언제 써야 하는지**는 [dfs.md](./dfs.md)에서 다룬다.
이 문서는 쓰기로 정한 뒤 — 그 `if` 두 개가 각각 무엇을 막는지를 다룬다.

## 기준 코드 — 판정과 결과는 나눠 담는다

```ts
const visited = new Set<number>([start]);   // 판정용 — 여기 왔었나?
const order: number[] = [start];            // 결과용 — 방문 순서
const nextTraversingList: number[] = [...graph[start]];

while (nextTraversingList.length > 0) {
  const visitedNode = nextTraversingList.pop()!;

  if (!visited.has(visitedNode)) {             // if 1
    visited.add(visitedNode);
    order.push(visitedNode);
  }

  for (const toVisitNode of graph[visitedNode]) {
    if (!visited.has(toVisitNode)) {           // if 2
      nextTraversingList.push(toVisitNode);
    }
  }
}

return order;
```

판정용 `visited` 와 결과용 `order` 를 나눠 뒀다.
하나로 겸하면(= `visited` 를 그대로 결과로 반환하면) 기록 위치를 조금만 옮겨도 판정 기준까지 같이 흔들린다.

[dfs.md](./dfs.md)의 골격과 초기값 넣는 방식만 다르다. 저쪽은 시작 노드를 스택에 넣고 출발하고,
여기서는 시작 노드를 미리 방문 처리한 뒤 그 이웃부터 스택에 담는다. 결과는 같다.

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

그래서 두 `if` 는 항상 같이 넣는다. 하나만 빼도 되는 조건은 따지지 않는다.
(`if 1` 이 사이클만 막는다고 외우면 틀린다. 고리가 없는 그래프에서도 같은 노드가 스택에 두 번 들어간다.)
