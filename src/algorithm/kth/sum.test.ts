import {BinaryTreeNode} from '@/data-structure/tree/binary';
import {sumKSmallestBST} from '@/algorithm/kth/sum';

// yarn test src/algorithm/kth/sum.test.ts
describe('sumKSmallestBST()', () => {
  it('should return the correct sum for a given example tree', () => {
    const root = new BinaryTreeNode(8);
    root.left = new BinaryTreeNode(7);
    root.right = new BinaryTreeNode(10);
    root.left.left = new BinaryTreeNode(2);
    root.right.left = new BinaryTreeNode(9);
    root.right.right = new BinaryTreeNode(13);
    expect(sumKSmallestBST(root, 3)).toBe(17);
  });

  it('should return 0 when the tree is empty', () => {
    expect(sumKSmallestBST(undefined, 3)).toBe(0);
  });

  it('should return 0 when count is 0', () => {
    expect(sumKSmallestBST(new BinaryTreeNode(10), 0)).toBe(0);
  });
});
