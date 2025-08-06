import {LinkedListBinaryTree} from '@/examples/data-structure/tree/complete-binary/linked-list';
import {ArrayBinaryTree} from '@/examples/data-structure/tree/complete-binary/array';

const implementations = [
  {name: 'Linked List', fn: LinkedListBinaryTree},
  {name: 'Array', fn: ArrayBinaryTree},
];

// yarn test src/examples/data-structure/tree/complete-binary/test.ts
describe.each(implementations)('Tree Implementation > $name', ({fn}) => {
  describe('General cases', () => {
    it('should add items correctly and maintain the tree structure', () => {
      const tree = new fn<number>();
      tree.add(1);
      expect(tree.length).toBe(1);
      tree.add(2);
      tree.add(3);
      tree.add(4);
      tree.add(5);
      tree.add(6);
      tree.add(7);
      tree.add(8);
      expect(tree.toArray()).toEqual([[1], [2, 3], [4, 5, 6, 7], [8]]);
    });

    it('should provide the correct index for each item upon iteration', () => {
      const tree = new fn<number>();
      tree.add(1);
      tree.add(2);
      expect(Array.from(tree)).toEqual([{data: 1, index: 0, level: 0}, {data: 2, index: 1, level: 1}]);
    });

    it('should delete an intermediate node correctly', () => {
      const tree = new fn<number>();
      [10, 20, 30, 40, 50, 60].forEach(v => tree.add(v));

      const deleted = tree.delete(30);
      expect(deleted).toBe(30);
      expect(tree.length).toBe(5);
      expect(tree.toArray()).toEqual([[10], [20, 60], [40, 50]]);
    });

    it('should become an empty tree after deleting all nodes', () => {
      const tree = new fn<number>();
      const initialData = [10, 20, 30, 40, 50];
      initialData.forEach(v => tree.add(v));

      const dataToDelete = [30, 40, 10, 50, 20];

      for (let i = 0; i < dataToDelete.length; i++) {
        tree.delete(dataToDelete[i]);
        expect(tree.length).toBe(initialData.length - 1 - i);
      }

      expect(tree.length).toBe(0);
      expect(tree.toArray()).toEqual([]);
    });

    it('Tree의 height값이 정확히 구해져야한다.', () => {
      const tree = new fn<number>();
      expect(tree.height).toBe(-1);
      tree.add(1);
      expect(tree.height).toBe(0);
      tree.add(2);
      expect(tree.height).toBe(1);
      tree.add(3);
      expect(tree.height).toBe(1);
      tree.add(4);
      expect(tree.height).toBe(2);
      tree.add(5);
      expect(tree.height).toBe(2);
      tree.add(6);
      expect(tree.height).toBe(2);
      tree.add(7);
      expect(tree.height).toBe(2);
      tree.add(8);
      expect(tree.height).toBe(3);
    });
  });

  describe('Boundary cases', () => {
    it('should handle an empty tree correctly', () => {
      const tree = new fn<number>();
      expect(tree.length).toBe(0);
      expect(Array.from(tree)).toEqual([]);
      expect(tree.delete(1)).toBeUndefined();
    });

    it('should delete the last node correctly', () => {
      const tree = new fn<number>();
      [1, 2, 3].forEach(value => tree.add(value));

      const deleted = tree.delete(3);
      expect(deleted).toBe(3);
      expect(tree.length).toBe(2);
      expect(tree.toArray()).toEqual([[1], [2]]);
    });

    it('should delete the root node correctly', () => {
      const tree = new fn<number>();
      [1, 2, 3, 4].forEach(value => tree.add(value));

      const deleted = tree.delete(1);
      expect(deleted).toBe(1);
      expect(tree.length).toBe(3);
      expect(tree.toArray()).toEqual([[4], [2, 3]]);
    });
  });

  describe('Edge cases', () => {
    it('should not alter the tree when deleting a non-existent item', () => {
      const tree = new fn<number>();
      [1, 2, 3].forEach(v => tree.add(v));

      const deleted = tree.delete(99);
      expect(deleted).toBeUndefined();
      expect(tree.length).toBe(3);
      expect(tree.toArray()).toEqual([[1], [2, 3]]);
    });
  });
});
