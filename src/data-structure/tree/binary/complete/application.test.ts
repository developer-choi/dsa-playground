import {BinaryTreeNode} from '@/data-structure/tree/binary';
import {isSymmetricBinaryTree} from '@/data-structure/tree/binary/complete/application';

// yarn test src/data-structure/tree/binary/complete/application.test.ts
describe('isSymmetricBinaryTree()', () => {
  it('예제는 만족해야한다.', () => {
    const root = new BinaryTreeNode(1);
    root.left = new BinaryTreeNode(2);
    root.right = new BinaryTreeNode(2);
    root.left.left = new BinaryTreeNode(3);
    root.left.right = new BinaryTreeNode(4);
    root.right.left = new BinaryTreeNode(4);
    root.right.right = new BinaryTreeNode(3);
    expect(isSymmetricBinaryTree(root)).toBe(true);
  });

  it('예제 2는 만족해야한다.', () => {
    const root = new BinaryTreeNode(1);
    root.left = new BinaryTreeNode(2);
    root.right = new BinaryTreeNode(2);
    root.left.right = new BinaryTreeNode(3);
    root.right.right = new BinaryTreeNode(3);
    expect(isSymmetricBinaryTree(root)).toBe(false);
  });
});
