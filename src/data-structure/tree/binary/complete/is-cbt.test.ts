import {isCompleteBinaryTree} from '@/data-structure/tree/binary/complete/is-cbt';
import {BinaryTreeNode} from '@/data-structure/tree/binary';

const algorithms = [
  {name: 'My Solution', fn: isCompleteBinaryTree},
];

// yarn test src/data-structure/tree/binary/complete/is-cbt.test.ts
describe.each(algorithms)('Complete Binary Tree Check > $name', ({fn}) => {
  describe('General cases', () => {
    it('should return true for a perfect binary tree', () => {
      const root = new BinaryTreeNode(1);
      root.left = new BinaryTreeNode(2);
      root.right = new BinaryTreeNode(3);
      expect(fn(root)).toBe(true);
    });

    it('should return false if the root has a right child but no left child', () => {
      const root = new BinaryTreeNode(1);
      root.right = new BinaryTreeNode(3);
      expect(fn(root)).toBe(false);
    });

    it('should return false if the last level is not filled from the left', () => {
      const root = new BinaryTreeNode(1);
      root.left = new BinaryTreeNode(2);
      root.right = new BinaryTreeNode(3);
      root.left.left = new BinaryTreeNode(4);
      root.right.left = new BinaryTreeNode(6);
      root.right.right = new BinaryTreeNode(7);
      expect(fn(root)).toBe(false);
    });
  });

  describe('Boundary cases', () => {
    it('should return true for an empty tree', () => {
      expect(fn(undefined)).toBe(true);
    });

    it('should return true for a tree with only a root node', () => {
      const root = new BinaryTreeNode(1);
      expect(fn(root)).toBe(true);
    });
  });
});
