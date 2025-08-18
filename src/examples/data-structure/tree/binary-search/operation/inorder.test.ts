import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {
  iterativeInorderSuccessorBST,
  recursiveInorderSuccessorBST,
} from '@/examples/data-structure/tree/binary-search/operation/inorder';

const algorithms = [
  {name: 'Recursive', fn: recursiveInorderSuccessorBST},
  {name: 'Iterative', fn: iterativeInorderSuccessorBST},
];

// yarn test src/examples/data-structure/tree/binary-search/operation/inorder.test.ts
describe.each(algorithms)('In-order Successor in BST using $name implementation', ({fn}) => {
  const root = new BinaryTreeNode(20);
  // level 1
  root.left = new BinaryTreeNode(8);
  root.right = new BinaryTreeNode(22);
  // level 2
  root.left.left = new BinaryTreeNode(4);
  root.left.right = new BinaryTreeNode(12);
  // level 3
  root.left.right.left = new BinaryTreeNode(10);
  root.left.right.right = new BinaryTreeNode(14);

  describe('General Cases', () => {
    it('should find the successor when it is in the right subtree', () => {
      expect(fn(root, 8)).toBe(10);
    });

    it('should find the successor when it is a close ancestor', () => {
      expect(fn(root, 10)).toBe(12);
    });

    it('should find the successor when it is a distant ancestor (the root)', () => {
      expect(fn(root, 14)).toBe(20);
    });
  });

  describe('Boundary Cases', () => {
    it('should find the successor of the root node', () => {
      expect(fn(root, 20)).toBe(22);
    });

    it('should return undefined for the largest node in the tree', () => {
      expect(fn(root, 22)).toBe(undefined);
    });

    it('should return undefined for a tree with only one node', () => {
      const node = new BinaryTreeNode(100);
      expect(fn(node, 100)).toBe(undefined);
    });
  });

  describe('Edge Cases', () => {
    it('should return undefined for an empty tree', () => {
      expect(fn(undefined, 10)).toBe(undefined);
    });

    it('should return undefined if the target does not exist in the tree', () => {
      expect(fn(root, 99)).toBe(undefined);
    });
  });
});
