import {BinarySearchTree} from '@/examples/data-structure/tree/binary-search/index';

// yarn test src/examples/data-structure/tree/binary-search/index.test.ts
describe('BinarySearchTree', () => {
  describe('General cases', () => {
    it('should be able to find the minimum and maximum values in the tree', () => {
      const tree = new BinarySearchTree();
      tree.insert(10);
      tree.insert(20);
      tree.insert(5);
      tree.insert(15);
      expect(tree.getMinimum()).toBe(5);
      expect(tree.getMaximum()).toBe(20);
    });
  });

  describe('Boundary cases', () => {
    it('should return undefined for both minimum and maximum when the tree is empty', () => {
      const tree = new BinarySearchTree();
      expect(tree.getMinimum()).toBe(undefined);
      expect(tree.getMaximum()).toBe(undefined);
    });
  });
});
