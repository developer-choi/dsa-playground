/**
 * [기본] 같은 그래프를 세 가지 방식으로 순회하기
 *
 *              (1)
 *            /  |  \
 *         (2)  (5)  (9)
 *          |   /  \   \
 *         (3) (6)  (8) (10)
 *          |   |
 *         (4) (7)
 *
 * 시작 노드부터 DFS로 순회하며 "방문한 순서대로" 노드 번호를 담은 배열을 반환하라.
 * 단, 아래 세 가지 방식으로 각각 구현한다.
 *
 * 공통 규칙:
 * - 스택에 넣을 때는 인접 리스트에 적힌 순서 그대로 넣는다.
 *   따라서 나중에 넣은(= 번호가 큰) 노드부터 꺼내진다.
 * - 같은 그래프·같은 시작점이면 세 함수의 방문 순서가 완전히 같아야 한다.
 *
 * 예시: 위 그래프를 1번부터 순회하면
 *   [1, 9, 10, 5, 8, 6, 7, 2, 3, 4]
 *
 * 어느 방식이 어느 그래프까지 감당하는지는 테스트 파일 참고.
 */

/** 아무것도 두지 말 것. `pop` 과 `push` 만 쓴다. */
export function bare(graph: Record<number, number[]>, start: number): number[] {
  const nextTraversingList: number[] = [start];
  const result: number[] = [];

  while (nextTraversingList.length) {
    const node = nextTraversingList.pop()!;
    result.push(node);

    for (const nextNode of graph[node]) {
      nextTraversingList.push(nextNode);
    }
  }

  return result;
}

/** `visited` 로 거를 것. */
export function withVisited(graph: Record<number, number[]>, start: number): number[] {
  const nextTraversingList: number[] = [start];
  const visited = new Set<number>();
  const result: number[] = [];

  while (nextTraversingList.length) {
    const node = nextTraversingList.pop()!;

    if (!visited.has(node)) {
      visited.add(node);
      result.push(node);
    }

    for (const nextNode of graph[node]) {
      if (!visited.has(nextNode)) {
        nextTraversingList.push(nextNode);
      }
    }
  }

  return result;
}

export type Frame = {
  node: number;
  /** 어디서 넘어왔나. 시작 노드는 온 곳이 없다. */
  parent: number | null;
  /** 시작 노드가 0. */
  depth: number;
  /** 시작 노드부터 여기까지 밟아온 노드들. */
  path: number[];
};

/**
 * 스택에 노드 번호가 아니라 "그 노드에 도착했을 때의 상태"를 통째로 담을 것.
 *
 * 번호만 담으면 꺼낸 뒤에 알 수 있는 게 번호뿐이다.
 * 부모·깊이·경로는 "그 노드로 가는 도중"에만 알 수 있는 정보라,
 * 넣는 순간 같이 묶어두지 않으면 나중에 되찾을 방법이 없다.
 *
 * 분기가 생기면 자식마다 새 상태를 만들어 넣으므로 갈래별 값이 저절로 갈라진다.
 * 별도 자료구조로 부모를 추적하지 않아도 되는 이유가 이것이다.
 *
 * 되돌아가는 길이 없는 그래프 전용 — `bare` 와 같은 골격이라 visited 가 없다.
 */
export function withState(graph: Record<number, number[]>, start: number): Frame[] {
  const nextTraversingList: Frame[] = [{node: start, parent: null, depth: 0, path: [start]}];
  const result: Frame[] = [];

  while (nextTraversingList.length) {
    const frame = nextTraversingList.pop()!;
    result.push(frame);

    for (const nextNode of graph[frame.node]) {
      nextTraversingList.push({
        node: nextNode,
        parent: frame.node,
        depth: frame.depth + 1,
        // 경로를 통째로 들고 다니면 노드마다 O(깊이) 복사가 일어난다.
        // 실전에선 "경로 길이 합" 같은 숫자 하나로 압축해서 담는다.
        path: [...frame.path, nextNode],
      });
    }
  }

  return result;
}
