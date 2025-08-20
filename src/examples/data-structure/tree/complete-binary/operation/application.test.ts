import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {
  getBoundary,
  getLengthInTree,
  getMaxDepthInTree, isSumTree
} from '@/examples/data-structure/tree/complete-binary/operation/application';

const algorithms = [
  {name: 'Breadth First', traversal: 'breadth-first'},
  {name: 'Depth First (preorder)', traversal: 'preorder'},
  {name: 'Depth First (inorder)', traversal: 'inorder'},
  {name: 'Depth First (postorder)', traversal: 'postorder'},
] as const;

// yarn test src/examples/data-structure/tree/complete-binary/operation/application.test.ts
describe.each(algorithms)('Traverse Tree Algorithm > $name', ({traversal}) => {
  describe('getMaxDepthInTree()', () => {
    it('should return the correct depth for example 1', () => {
      const root = new BinaryTreeNode(12);
      root.left = new BinaryTreeNode(8);
      root.right = new BinaryTreeNode(18);
      root.left.left = new BinaryTreeNode(5);
      root.left.right = new BinaryTreeNode(11);
      expect(getMaxDepthInTree(root, traversal)).toBe(2);
    });

    it('should return the correct depth for example 2', () => {
      const root = new BinaryTreeNode(1);
      root.left = new BinaryTreeNode(2);
      root.right = new BinaryTreeNode(3);
      root.left.left = new BinaryTreeNode(4);
      root.right.right = new BinaryTreeNode(5);
      root.right.right.left = new BinaryTreeNode(6);
      root.right.right.right = new BinaryTreeNode(7);
      expect(getMaxDepthInTree(root, traversal)).toBe(3);
    });
  });

  describe('getLengthInTree()', () => {
    it('should return the correct number of nodes', () => {
      const root = new BinaryTreeNode(5);
      root.left = new BinaryTreeNode(1);
      root.right = new BinaryTreeNode(6);
      root.left.left = new BinaryTreeNode(3);
      root.right.left = new BinaryTreeNode(7);
      root.right.right = new BinaryTreeNode(4);
      expect(getLengthInTree(root, traversal)).toBe(6);
    });
  });

  describe('getBoundary()', () => {
    it('should return the correct min and max values', () => {
      const root = new BinaryTreeNode(1);
      root.left = new BinaryTreeNode(2);
      root.right = new BinaryTreeNode(3);
      root.left.left = new BinaryTreeNode(4);
      root.right.left = new BinaryTreeNode(5);
      root.right.right = new BinaryTreeNode(6);
      root.left.left.right = new BinaryTreeNode(7);
      root.right.left.left = new BinaryTreeNode(8);
      root.right.left.right = new BinaryTreeNode(9);
      expect(getBoundary(root, traversal)).toEqual({min: 1, max: 9});
    });
  });

  describe('isSumTree()', () => {
    it('should correctly identify a SumTree and a non-SumTree', () => {
      const root = new BinaryTreeNode(26);
      root.left = new BinaryTreeNode(10);
      root.right = new BinaryTreeNode(3);
      root.left.left = new BinaryTreeNode(4);
      root.left.right = new BinaryTreeNode(6);
      root.right.right = new BinaryTreeNode(3);
      expect(isSumTree(root, traversal)).toBe(true);
      root.left.left.data = 2;
      expect(isSumTree(root, traversal)).toBe(false);
    });
  });
});
