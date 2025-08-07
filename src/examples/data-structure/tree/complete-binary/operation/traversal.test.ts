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
    const root = new BinaryTreeNode(1);
    root.left = new BinaryTreeNode(2);
    root.right = new BinaryTreeNode(3);
    root.left.left = new BinaryTreeNode(4);
    root.left.right = new BinaryTreeNode(5);
    root.right.right = new BinaryTreeNode(6);

    it.each(traversalCases)('should return nodes in $mode order', ({mode, expected}) => {
      const result = depthFirstTraversal(root, mode);
      expect(result.array).toEqual(expected);
      expect(result.maxHeight).toEqual(2);
    });
  });

  describe('BFS', () => {
    it('should visit nodes in breadth-first sequence', () => {
      const root = new BinaryTreeNode(5);
      root.left = new BinaryTreeNode(12);
      root.right = new BinaryTreeNode(13);

      root.left.left = new BinaryTreeNode(7);
      root.left.right = new BinaryTreeNode(14);

      root.right.right = new BinaryTreeNode(2);

      root.left.left.left = new BinaryTreeNode(17);
      root.left.left.right = new BinaryTreeNode(23);

      root.left.right.left = new BinaryTreeNode(27);
      root.left.right.right = new BinaryTreeNode(3);

      root.right.right.left = new BinaryTreeNode(8);
      root.right.right.right = new BinaryTreeNode(11);

      expect(summarizeBinaryTree(root)).toEqual([
        {level: 0, data: 5, direction: undefined},
        {level: 1, data: 12, direction: 'left'},
        {level: 1, data: 13, direction: 'right'},
        {level: 2, data: 7, direction: 'left'},
        {level: 2, data: 14, direction: 'right'},
        {level: 2, data: 2, direction: 'right'},
        {level: 3, data: 17, direction: 'left'},
        {level: 3, data: 23, direction: 'right'},
        {level: 3, data: 27, direction: 'left'},
        {level: 3, data: 3, direction: 'right'},
        {level: 3, data: 8, direction: 'left'},
        {level: 3, data: 11, direction: 'right'},
      ]);
    });
  });
});
