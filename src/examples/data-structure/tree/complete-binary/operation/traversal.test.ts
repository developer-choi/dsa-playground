import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {depthFirstTraversal} from '@/examples/data-structure/tree/complete-binary/operation/traversal';

const algorithms = [
  {name: 'DFS', fn: depthFirstTraversal},
];

const traversalCases = [
  {
    mode: 'inorder' as const, // Left -> Root -> Right
    expected: [4, 2, 5, 1, 3, 6],
  },
  {
    mode: 'preorder' as const, // Root -> Left -> Right
    expected: [1, 2, 4, 5, 3, 6],
  },
  {
    mode: 'postorder' as const, // Left -> Right -> Root
    expected: [4, 5, 2, 6, 3, 1],
  },
];

// yarn test src/examples/data-structure/tree/complete-binary/operation/traversal.test.ts
describe.each(algorithms)('Depth First Traversal > $name', ({fn}) => {
  const root = new BinaryTreeNode<number>(1);
  root.left = new BinaryTreeNode<number>(2);
  root.right = new BinaryTreeNode<number>(3);
  root.left.left = new BinaryTreeNode<number>(4);
  root.left.right = new BinaryTreeNode<number>(5);
  root.right.right = new BinaryTreeNode<number>(6);

  it.each(traversalCases)('should return nodes in $mode order', ({mode, expected}) => {
    const result = fn(root, mode);
    expect(result.array).toEqual(expected);
    expect(result.maxHeight).toEqual(2);
  });
});
