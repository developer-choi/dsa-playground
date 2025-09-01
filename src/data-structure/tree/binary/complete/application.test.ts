import {BinaryTreeNode} from '@/data-structure/tree/binary';
import {isSymmetricBinaryTree} from '@/data-structure/tree/binary/complete/application';

// yarn test src/data-structure/tree/binary/complete/application.test.ts
describe('isSymmetricBinaryTree()', () => {
  describe('General cases', () => {
    it('should return true for a symmetric tree', () => {
      const root = new BinaryTreeNode(1);
      root.left = new BinaryTreeNode(2);
      root.right = new BinaryTreeNode(2);
      root.left.left = new BinaryTreeNode(3);
      root.left.right = new BinaryTreeNode(4);
      root.right.left = new BinaryTreeNode(4);
      root.right.right = new BinaryTreeNode(3);
      expect(isSymmetricBinaryTree(root)).toBe(true);
    });

    it('should return false for an asymmetric tree (structural difference)', () => {
      const root = new BinaryTreeNode(1);
      root.left = new BinaryTreeNode(2);
      root.right = new BinaryTreeNode(2);
      root.left.right = new BinaryTreeNode(3);
      root.right.right = new BinaryTreeNode(3);
      expect(isSymmetricBinaryTree(root)).toBe(false);
    });

    it('should return false for an asymmetric tree (value difference)', () => {
      const root = new BinaryTreeNode(1);
      root.left = new BinaryTreeNode(2);
      root.right = new BinaryTreeNode(5);
      expect(isSymmetricBinaryTree(root)).toBe(false);
    });
  });

  describe('Boundary cases', () => {
    it('should return true for an empty tree (undefined root)', () => {
      expect(isSymmetricBinaryTree(undefined)).toBe(true);
    });

    it('should return true for a tree with only a root node', () => {
      const root = new BinaryTreeNode(1);
      expect(isSymmetricBinaryTree(root)).toBe(true);
    });
  });
});
