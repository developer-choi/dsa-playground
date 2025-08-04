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
      expect(tree.toArray()).toEqual([[1], [2, 3], [4, 5, 6, 7], [8]])
    });
  });

  describe('Boundary Case', () => {
    it('should handle an empty tree correctly', () => {
      const tree = new fn<number>();
      expect(tree.length).toBe(0);
      expect(Array.from(tree)).toEqual([]);
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
