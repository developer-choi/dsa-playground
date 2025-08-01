import {BinaryTreeNode, CompleteBinaryTree} from '@/examples/data-structure/tree/index';

// yarn test src/examples/data-structure/tree/test.ts
describe('Complete Binary Tree', () => {
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

    const tree = new CompleteBinaryTree<number>();
    //@ts-ignore
    tree.root = root;

    expect(tree.toArray()).toEqual([[5], [12, 13], [7, 14, 2], [17, 23, 27, 3, 8, 11]]);
  });
});
