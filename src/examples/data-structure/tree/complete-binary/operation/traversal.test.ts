import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {depthFirstTraversal} from '@/examples/data-structure/tree/complete-binary/operation/traversal';
import {summarizeBinaryTree} from '@/utils/extend/test/jest';

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
describe('Binary Tree Traversal', () => {
  describe('DFS', () => {
    const root = new BinaryTreeNode<number>(1);
    root.left = new BinaryTreeNode<number>(2);
    root.right = new BinaryTreeNode<number>(3);
    root.left.left = new BinaryTreeNode<number>(4);
    root.left.right = new BinaryTreeNode<number>(5);
    root.right.right = new BinaryTreeNode<number>(6);

    it.each(traversalCases)('should return nodes in $mode order', ({mode, expected}) => {
      const result = depthFirstTraversal(root, mode);
      expect(result.array).toEqual(expected);
      expect(result.maxHeight).toEqual(2);
    });
  });

  describe('BFS', () => {
    it('should visit nodes in breadth-first sequence', () => {
      const root = new BinaryTreeNode<number>(5);
      root.left = new BinaryTreeNode<number>(12);
      root.right = new BinaryTreeNode<number>(13);

      root.left.left = new BinaryTreeNode<number>(7);
      root.left.right = new BinaryTreeNode<number>(14);

      root.right.right = new BinaryTreeNode<number>(2);

      root.left.left.left = new BinaryTreeNode<number>(17);
      root.left.left.right = new BinaryTreeNode<number>(23);

      root.left.right.left = new BinaryTreeNode<number>(27);
      root.left.right.right = new BinaryTreeNode<number>(3);

      root.right.right.left = new BinaryTreeNode<number>(8);
      root.right.right.right = new BinaryTreeNode<number>(11);

      expect(summarizeBinaryTree(root)).toEqual([
        {level: 0, data: 5},
        {level: 1, data: 12},
        {level: 1, data: 13},
        {level: 2, data: 7},
        {level: 2, data: 14},
        {level: 2, data: 2},
        {level: 3, data: 17},
        {level: 3, data: 23},
        {level: 3, data: 27},
        {level: 3, data: 3},
        {level: 3, data: 8},
        {level: 3, data: 11},
      ]);
    });
  });
});
