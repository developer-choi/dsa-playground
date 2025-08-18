import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {inorderBST} from '@/examples/data-structure/tree/binary-search/operation/inorder';

// yarn test src/examples/data-structure/tree/binary-search/operation/inorder.test.ts
describe('inorderBST()', () => {
  it('예제는 만족해야한다', () => {
    const root = new BinaryTreeNode(20);
    // level1
    root.left = new BinaryTreeNode(8);
    root.right = new BinaryTreeNode(22);
    // level2
    root.left.left = new BinaryTreeNode(4);
    root.left.right = new BinaryTreeNode(12);
    // level3
    root.left.right.left = new BinaryTreeNode(10);
    root.left.right.right = new BinaryTreeNode(14);
    expect(inorderBST(root, 8)).toBe(10);
    expect(inorderBST(root, 10)).toBe(12);
    expect(inorderBST(root, 14)).toBe(20);
  });
});
