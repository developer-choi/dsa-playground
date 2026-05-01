const graph: Record<number, number[]> = {
  1: [2, 3],
  2: [4, 5],
  3: [6],
  4: [],
  5: [],
  6: [],
};

/*
      1
     / \
    2   3
   / \   \
  4   5   6
*/

type Frame = {
  node: number;
  parent: number | null;
  depth: number;
  path: number[];
};

const stack: Frame[] = [{ node: 1, parent: null, depth: 0, path: [1] }];

while (stack.length) {
  const { node, parent, depth, path } = stack.pop()!;

  console.log({ node, parent, depth, path });

  for (const next of graph[node]) {
    stack.push({ node: next, parent: node, depth: depth + 1, path: [...path, next] });
  }
}
