/**
 * Docs: docs/company-test/wf-4.md
 * Description: 디렉토리 경로 — 루트에서 리프까지 가장 긴 경로의 문자 수 반환
 */

export function dfs(N: number, relation: [number, number][], dirname: string[]): number {
  const graph: Record<number, number[]> = {};

  for (const [parent, children] of relation) {
    if (parent in graph) graph[parent].push(children);
    else graph[parent] = [children];

    if (children in graph) graph[children].push(parent);
    else graph[children] = [parent];
  }

  const leafNodeSelfAndParentNodes = findLeafPaths(graph);
  const allDirNames = leafNodeSelfAndParentNodes.map(nodes =>
    nodes.map(node => dirname[node - 1]).join('/').length
  );

  return Math.max(...allDirNames);
}

function findLeafPaths(graph: Record<number, number[]>): number[][] {
  const visited = new Set<number>([1]);
  const parents: Record<number, number[]> = {};
  const stack: number[] = graph[1];
  const leafNodes: number[] = [];

  for (const children of stack) {
    parents[children] = [1];
  }

  while (stack.length) {
    const visiting = stack.pop()!;
    visited.add(visiting);

    let childrenCount = 0;

    for (const grandChildren of graph[visiting]) {
      if (!visited.has(grandChildren)) {
        stack.push(grandChildren);
        childrenCount++;
        parents[grandChildren] = [visiting, ...parents[visiting]];
      }
    }

    if (childrenCount === 0) leafNodes.push(visiting);
  }

  return leafNodes.map(leafNode => [leafNode, ...parents[leafNode]]);
}
