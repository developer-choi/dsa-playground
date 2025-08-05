import {BinaryTreeNode} from '@/examples/data-structure/tree/index';
import {LinkedListBinaryTree} from '@/examples/data-structure/tree/linked-list';
import {ArrayBinaryTree} from '@/examples/data-structure/tree/array';

const implementations = [
  {name: 'Linked List', fn: LinkedListBinaryTree},
  {name: 'Array', fn: ArrayBinaryTree},
];

// yarn test src/examples/data-structure/tree/test.ts
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

describe('Linked List Binary Tree', () => {
  it('should visit nodes in breadth-first sequence', () => {
    const root = new BinaryTreeNode<number>(5);
    root.left = new BinaryTreeNode<number>(12);
    root.right = new BinaryTreeNode<number>(13);

    root.left.left = new BinaryTreeNode<number>(7);
    root.left.right = new BinaryTreeNode<number>(14);

    root.right.right = new BinaryTreeNode<number>(2);

    root.left.left.left = new BinaryTreeNode<number>(17);
    root.left.left.right = new BinaryTreeNode<number>(23);

    root.left.right.left = new BinaryTreeNode<number>(27);
    root.left.right.right = new BinaryTreeNode<number>(3);

    root.right.right.left = new BinaryTreeNode<number>(8);
    root.right.right.right = new BinaryTreeNode<number>(11);

    const tree = new LinkedListBinaryTree<number>();
    //@ts-ignore
    tree.root = root;

    expect(tree.toArray()).toEqual([[5], [12, 13], [7, 14, 2], [17, 23, 27, 3, 8, 11]]);
  });

  it('should maintain the complete binary tree structure upon adding new nodes', () => {
    const tree = new LinkedListBinaryTree<number>();
    tree.add(1);
    tree.add(2);
    tree.add(3);
    tree.add(4);

    //@ts-ignore
    expect(tree.root.data).toBe(1);
    //@ts-ignore
    expect(tree.root.left.data).toBe(2);
    //@ts-ignore
    expect(tree.root.right.data).toBe(3);
    //@ts-ignore
    expect(tree.root.left.left.data).toBe(4);
  });
});
