import {BinaryTreeNode} from '@/data-structure/tree/binary/index';
import {getHeightDiameter, getHeightOfNode} from '@/data-structure/tree/binary/max-diameter';

// yarn test src/data-structure/tree/binary/max-diameter.test.ts
describe('getHeightOfNode()', () => {
  describe('General cases', () => {
    it('should calculate the height of a node correctly', () => {
      const root = new BinaryTreeNode(1);
      root.left = new BinaryTreeNode(2);
      root.right = new BinaryTreeNode(3);
      root.left.right = new BinaryTreeNode(4);
      root.right.left = new BinaryTreeNode(5);
      root.right.left.right = new BinaryTreeNode(6);

      expect(getHeightOfNode(root)).toBe(3);
      expect(getHeightOfNode(root.left)).toBe(1);
      expect(getHeightOfNode(root.right)).toBe(2);
    });
  });

  describe('Edge cases', () => {
    it('should handle a left-skewed tree correctly', () => {
      const root = new BinaryTreeNode(1);
      root.left = new BinaryTreeNode(2);
      root.left.left = new BinaryTreeNode(3);
      root.left.left.left = new BinaryTreeNode(4);
      expect(getHeightDiameter(root)).toBe(3);
    });

    it('should return 0 for a tree with a single node', () => {
      const root = new BinaryTreeNode(1);
      expect(getHeightDiameter(root)).toBe(0);
    });

    it('should return 0 for an empty tree', () => {
      expect(getHeightDiameter(undefined)).toBe(0);
    });
  });
});

describe('getHeightDiameter()', () => {
  it('should return the correct diameter for a simple tree', () => {
    const root = new BinaryTreeNode(1);
    root.left = new BinaryTreeNode(2);
    root.right = new BinaryTreeNode(3);
    expect(getHeightDiameter(root)).toBe(2);
  });
  it('should return the correct diameter for a more complex tree', () => {
    const root = new BinaryTreeNode(5);
    root.left = new BinaryTreeNode(8);
    root.right = new BinaryTreeNode(6);
    root.left.left = new BinaryTreeNode(3);
    root.left.right = new BinaryTreeNode(7);
    root.right.left = new BinaryTreeNode(9);
    expect(getHeightDiameter(root)).toBe(4);
  });
});
