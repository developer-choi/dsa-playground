import {getBoundary} from '@/examples/data-structure/tree/binary/search/application';
import {BinaryTreeNode} from '@/examples/data-structure/tree/binary';
import {iterativeInsertBST} from '@/examples/data-structure/tree/binary/search/insertion';

// yarn test src/examples/data-structure/tree/binary/search/application.test.ts
describe('getBoundary()', () => {
  describe('General cases', () => {
    it('should be able to find the minimum and maximum values in the tree', () => {
      const root = new BinaryTreeNode(10);
      iterativeInsertBST(root, 20);
      iterativeInsertBST(root, 5);
      iterativeInsertBST(root, 15);
      expect(getBoundary(root, 'min')).toBe(5);
      expect(getBoundary(root, 'max')).toBe(20);
    });
  });

  describe('Boundary cases', () => {
    it('should return undefined for both minimum and maximum when the tree is empty', () => {
      const root = undefined;
      expect(getBoundary(root, 'max')).toBe(undefined);
      expect(getBoundary(root, 'min')).toBe(undefined);
    });
  });
});
