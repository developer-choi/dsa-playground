/**
 * [기본] 인접 리스트 그래프를 DFS로 순회하기 (스택)
 *
 * 아래 그래프가 주어진다. 간선에 방향은 없다(양방향).
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
 *
 * 규칙:
 * - 스택에 넣을 때는 인접 리스트에 적힌 순서 그대로 넣는다.
 *   따라서 나중에 넣은(= 번호가 큰) 노드부터 꺼내진다.
 *   예) 1의 인접 리스트가 [2, 5, 9]면 9 -> 5 -> 2 순으로 꺼내진다.
 * - 이미 방문한 노드는 다시 방문하지 않는다.
 * - 시작 노드에서 도달할 수 없는 노드는 결과에 포함하지 않는다.
 *
 * 재귀로 짜면 2 -> 3 -> 4 순으로 먼저 내려가서 방문 순서가 다르게 나오지만,
 * "한 갈래를 끝까지 파고 든 뒤 되돌아온다"는 점은 같다. 구현의 차이일 뿐이다.
 *
 * 입력 형태: 노드 번호를 키로 갖는 객체
 *   {
 *     1: [2, 5, 9],
 *     2: [1, 3],
 *     ...
 *   }
 *   graph[n] = n번 노드와 연결된 노드 번호들.
 *
 * 예시: 위 그래프에서 1번부터 시작하면
 *   [1, 9, 10, 5, 8, 6, 7, 2, 3, 4]
 */

export function stack(graph: Record<number, number[]>, start: number): number[] {
  const visited: number[] = [start];
  const nextTraversingList: number[] = [...graph[start]];

  while (nextTraversingList.length > 0) {
    const visitedNode = nextTraversingList.pop()!;

    if (!visited.includes(visitedNode)) {
      visited.push(visitedNode);
    }

    for (const toVisitNode of graph[visitedNode]) {
      if (!visited.includes(toVisitNode)) {
        nextTraversingList.push(toVisitNode);
      }
    }
  }

  return visited;
}
