/**
 * URL: src/problems/tree/wf-4.md
 * Description: 디렉토리 경로 — 루트에서 리프까지 가장 긴 경로의 문자 수 반환
 */

export function dfs(N: number, relation: [number, number][], dirname: string[]): number {
  let maxLength = 0;
  const graph: Record<number, number[] | undefined> = {};

  for(const [parent, child] of relation) {
    if (!graph[parent]) {
      graph[parent] = [child];
    } else {
      graph[parent].push(child);
    }
  }

  const nextTraversingList: {id: number, previousLength: number}[] = [{id: 1, previousLength: 0}];

  while (nextTraversingList.length) {
    const node = nextTraversingList.pop()!;
    const nodeDirectoryNameLength = node.previousLength + dirname[node.id - 1].length;
    const childrenNodes = graph[node.id];
    const isLeafNode = childrenNodes === undefined;

    if (isLeafNode) {
      maxLength = Math.max(maxLength, nodeDirectoryNameLength);

    } else {
      for (const nextNode of childrenNodes) {
        nextTraversingList.push({
          id: nextNode,
          previousLength: nodeDirectoryNameLength + DIRECTORY_SYMBOL_LENGTH
        });
      }
    }
  }

  return maxLength;
}

const DIRECTORY_SYMBOL_LENGTH = '/'.length;