/**
 * [기본] 단방향 인접 리스트를 DFS로 순회하기 (visited 없이)
 *
 * 같은 그림이지만 인접 리스트를 아래 방향으로만 적었다.
 *
 *              (1)
 *            /  |  \
 *         (2)  (5)  (9)
 *          |   /  \   \
 *         (3) (6)  (8) (10)
 *          |   |
 *         (4) (7)
 *
 * {
 *   1: [2, 5, 9],
 *   2: [3],        // 부모(1)를 적지 않는다
 *   3: [4],
 *   4: [],
 *   ...
 * }
 *
 * 시작 노드부터 DFS로 순회하며 "방문한 순서대로" 노드 번호를 담은 배열을 반환하라.
 *
 * 규칙:
 * - 스택에 넣을 때는 인접 리스트에 적힌 순서 그대로 넣는다.
 *   따라서 나중에 넣은(= 번호가 큰) 노드부터 꺼내진다.
 * - **visited를 쓰지 말 것.** 위로 되돌아갈 길이 없으므로 같은 노드를 두 번 만날 일이 없다.
 *   꺼내고, 이웃을 넣고, 끝. 그게 전부다.
 * - 아래로 갈 수 없는 노드에서 시작하면 그 노드 하나만 반환된다.
 *
 * 예시: 위 그래프에서 1번부터 시작하면
 *   [1, 9, 10, 5, 8, 6, 7, 2, 3, 4]
 *
 * 이 결과는 같은 그림을 무방향으로 적고 visited로 걸러낸 결과와 완전히 같다.
 * (adjacency-list-dfs.ts 참고)
 */

export function stack(graph: Record<number, number[]>, start: number): number[] {
  const nextTraversingList: number[] = [start];
  const result: number[] = [];

  while (nextTraversingList.length > 0) {
    const nextNode = nextTraversingList.pop()!;
    result.push(nextNode);

    for (const node of graph[nextNode]) {
      nextTraversingList.push(node);
    }
  }

  return result;
}
