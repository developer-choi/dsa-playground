/**
 * [기본] 같은 그래프를 두 가지 방식으로 순회하기
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
 * 단, 아래 두 가지 방식으로 각각 구현한다.
 *
 * 공통 규칙:
 * - 스택에 넣을 때는 인접 리스트에 적힌 순서 그대로 넣는다.
 *   따라서 나중에 넣은(= 번호가 큰) 노드부터 꺼내진다.
 * - 같은 그래프·같은 시작점이면 두 함수의 반환값이 완전히 같아야 한다.
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
