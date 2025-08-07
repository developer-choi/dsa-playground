import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {
  recursiveInorderIsBST,
  recursiveMinMaxIsBST
} from '@/examples/data-structure/tree/binary-search/operation/is-bst';

const algorithms = [
  {name: 'Min Max', fn: recursiveMinMaxIsBST},
  {name: 'Inorder', fn: recursiveInorderIsBST},
];

// yarn test src/examples/data-structure/tree/binary-search/operation/is-bst.test.ts
describe.each(algorithms)('Check the tree is BST > $name', ({fn}) => {
  it('should return false for an invalid BST (right subtree violation)', () => {
    const root = new BinaryTreeNode(10);
    root.left = new BinaryTreeNode(5);
    root.right = new BinaryTreeNode(20);
    root.right.left = new BinaryTreeNode(9);
    root.right.right = new BinaryTreeNode(25);

    expect(fn(root)).toBe(false);
  });

  it('should return false for an invalid BST (left subtree violation)', () => {
    const root = new BinaryTreeNode(8);
    root.left = new BinaryTreeNode(5);
    root.right = new BinaryTreeNode(12);
    root.left.right = new BinaryTreeNode(9);

    expect(fn(root)).toBe(false);
  });

  it('should return true for a valid BST', () => {
    const root = new BinaryTreeNode(10);
    root.left = new BinaryTreeNode(5);
    root.right = new BinaryTreeNode(20);
    root.left.right = new BinaryTreeNode(9);
    root.right.right = new BinaryTreeNode(25);

    expect(fn(root)).toBe(true);
  });
});
