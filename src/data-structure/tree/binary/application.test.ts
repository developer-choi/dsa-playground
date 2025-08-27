import {BinaryTreeNode} from '@/data-structure/tree/binary/index';
import {
  getBoundary,
  getNodeCount,
  getMaxDepthInTree, isSumTree
} from '@/data-structure/tree/binary/application';
import {iterativeBoundaryBST} from '@/data-structure/tree/binary/search/application';
import {iterativeInsertBST} from '@/data-structure/tree/binary/search/insertion';

const algorithms = [
  {type: 'general', name: 'Breadth First', traversal: 'breadth-first'},
  {type: 'general', name: 'Depth First (preorder)', traversal: 'preorder'},
  {type: 'general', name: 'Depth First (inorder)', traversal: 'inorder'},
  {type: 'general', name: 'Depth First (postorder)', traversal: 'postorder'},
  {type: 'search', name: 'BST (Iterative)'},
] as const;

// yarn test src/data-structure/tree/binary/application.test.ts
describe.each(algorithms)('Traverse Tree Algorithm > $name', (arg) => {
  describe('getMaxDepthInTree()', () => {
    it('should return the correct depth for example 1', () => {
      const root = new BinaryTreeNode(12);
      root.left = new BinaryTreeNode(8);
      root.right = new BinaryTreeNode(18);
      root.left.left = new BinaryTreeNode(5);
      root.left.right = new BinaryTreeNode(11);

      if (arg.type === 'general') {
        expect(getMaxDepthInTree(root, arg.traversal)).toBe(2);
      }
    });

    it('should return the correct depth for example 2', () => {
      const root = new BinaryTreeNode(1);
      root.left = new BinaryTreeNode(2);
      root.right = new BinaryTreeNode(3);
      root.left.left = new BinaryTreeNode(4);
      root.right.right = new BinaryTreeNode(5);
      root.right.right.left = new BinaryTreeNode(6);
      root.right.right.right = new BinaryTreeNode(7);

      if (arg.type === 'general') {
        expect(getMaxDepthInTree(root, arg.traversal)).toBe(3);
      }
    });
  });

  describe('getNodeCount()', () => {
    it('should return the correct number of nodes', () => {
      const root = new BinaryTreeNode(5);
      root.left = new BinaryTreeNode(1);
      root.right = new BinaryTreeNode(6);
      root.left.left = new BinaryTreeNode(3);
      root.right.left = new BinaryTreeNode(7);
      root.right.right = new BinaryTreeNode(4);

      if (arg.type === 'general') {
        expect(getNodeCount(root, arg.traversal)).toBe(6);
      }
    });
  });

  describe('getBoundary()', () => {
    it('should return the correct min and max values', () => {
      const root = new BinaryTreeNode(5);
      iterativeInsertBST(root, 1);
      iterativeInsertBST(root, 9);
      iterativeInsertBST(root, 8);
      iterativeInsertBST(root, 2);
      iterativeInsertBST(root, 3);
      iterativeInsertBST(root, 7);
      iterativeInsertBST(root, 6);
      iterativeInsertBST(root, 4);

      const expectedResult = {
        min: 1,
        max: 9
      };

      if (arg.type === 'general') {
        expect(getBoundary(root, arg.traversal)).toEqual(expectedResult);
      } else {
        expect(iterativeBoundaryBST(root, 'min')).toBe(expectedResult.min);
        expect(iterativeBoundaryBST(root, 'max')).toBe(expectedResult.max);
      }
    });

    it('should return undefined for both minimum and maximum when the tree is empty', () => {
      const root = undefined;
      const expectedResult = {
        min: undefined,
        max: undefined
      };

      if (arg.type === 'general') {
        expect(getBoundary(root, arg.traversal)).toEqual(expectedResult);
      } else {
        expect(iterativeBoundaryBST(root, 'max')).toBe(expectedResult.min);
        expect(iterativeBoundaryBST(root, 'min')).toBe(expectedResult.max);
      }
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

      if (arg.type === 'general') {
        expect(isSumTree(root, arg.traversal)).toBe(true);
        root.left.left.data = 2;
        expect(isSumTree(root, arg.traversal)).toBe(false);
      }
    });
  });
});
