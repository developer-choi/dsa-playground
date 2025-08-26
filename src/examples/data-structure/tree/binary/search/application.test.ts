import {BinaryTreeNode} from '@/examples/data-structure/tree/binary';
import {iterativeLCABST, sumKSmallestBST} from '@/examples/data-structure/tree/binary/search/application';

// yarn test src/examples/data-structure/tree/binary/search/application.test.ts
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

describe('iterativeLCABST()', () => {
  const root = new BinaryTreeNode(20);
  root.left = new BinaryTreeNode(8);
  root.right = new BinaryTreeNode(22);
  root.left.left = new BinaryTreeNode(4);
  root.left.right = new BinaryTreeNode(12);
  root.left.right.left = new BinaryTreeNode(10);
  root.left.right.right = new BinaryTreeNode(14);

  it('should return the correct LCA for nodes in different subtrees', () => {
    expect(iterativeLCABST(root, [10, 14])).toBe(12);
    expect(iterativeLCABST(root, [4, 14])).toBe(8);
    expect(iterativeLCABST(root, [4, 22])).toBe(20);
  });

  it('should return the ancestor itself if one node is a descendant of the other', () => {
    expect(iterativeLCABST(root, [8, 14])).toBe(8);
    expect(iterativeLCABST(root, [20, 10])).toBe(20);
  });
});
