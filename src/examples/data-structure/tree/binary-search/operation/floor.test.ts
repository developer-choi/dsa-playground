import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {iterativeFloorBST, recursiveFloorBST} from '@/examples/data-structure/tree/binary-search/operation/floor';

const algorithms = [
  {name: 'Recursive', fn: recursiveFloorBST},
  {name: 'Iterative', fn: iterativeFloorBST},
];

// yarn test src/examples/data-structure/tree/binary-search/operation/floor.test.ts
describe.each(algorithms)('Floor Operation in BST > $name', ({fn}) => {
  const root = new BinaryTreeNode(50);
  // level1
  root.left = new BinaryTreeNode(30);
  root.right = new BinaryTreeNode(70);
  // level2
  root.left.left = new BinaryTreeNode(20);
  root.left.right = new BinaryTreeNode(40);
  root.right.left = new BinaryTreeNode(60);
  root.right.right = new BinaryTreeNode(80);
  // level3
  root.right.left.left = new BinaryTreeNode(55);
  root.right.left.right = new BinaryTreeNode(65);

  describe('General Cases', () => {
    it('should return the correct floor for a value between two nodes', () => {
      expect(fn(root, 58)).toBe(55);
    });

    it('should return the node value when the target is an exact match', () => {
      expect(fn(root, 60)).toBe(60);
    });

    it('should return the correct floor for a target smaller than the root', () => {
      expect(fn(root, 45)).toBe(40);
    });

    it('should return the root value when it is the correct floor', () => {
      expect(fn(root, 52)).toBe(50);
    });

    it('should return -1 when the target is smaller than the smallest node', () => {
      expect(fn(root, 10)).toBe(-1);
    });

    it('should return the maximum value when the target is larger than the largest node', () => {
      expect(fn(root, 100)).toBe(80);
    });
  });

  describe('Boundary Cases', () => {
    it('should return the node value when the target is the smallest node', () => {
      expect(fn(root, 20)).toBe(20);
    });

    it('should return the node value when the target is the largest node', () => {
      expect(fn(root, 80)).toBe(80);
    });
  });

  describe('Edge Cases', () => {
    it('should return -1 for an empty tree', () => {
      expect(fn(undefined, 40)).toBe(-1);
    });

    it('should work correctly for a tree with only one node', () => {
      const singleNode = new BinaryTreeNode(50);
      expect(fn(singleNode, 50)).toBe(50);
      expect(fn(singleNode, 100)).toBe(50);
      expect(fn(singleNode, 10)).toBe(-1);
    });
  });
});
