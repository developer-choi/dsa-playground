import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {iterativeCeilBST, recursiveCeilBST} from '@/examples/data-structure/tree/binary-search/operation/ceil';

const algorithms = [
  {name: 'Recursive', fn: recursiveCeilBST},
  {name: 'Iterative', fn: iterativeCeilBST},
];

// yarn test src/examples/data-structure/tree/binary-search/operation/ceil.test.ts
describe.each(algorithms)('Ceil Operation in BST > $name', ({fn}) => {
  const root = new BinaryTreeNode(8);
  // level1
  root.left = new BinaryTreeNode(4);
  root.right = new BinaryTreeNode(12);
  // level2
  root.left.left = new BinaryTreeNode(2);
  root.left.right = new BinaryTreeNode(6);
  root.right.left = new BinaryTreeNode(10);
  root.right.right = new BinaryTreeNode(14);

  it('should return the correct ceil for a value between two nodes', () => {
    expect(fn(root, 11)).toBe(12);
    expect(fn(root, 9)).toBe(10);
  });

  it('should return the node value when the target is an exact match', () => {
    expect(fn(root, 6)).toBe(6);
  });

  it('should return the smallest node value for a target smaller than the smallest node', () => {
    expect(fn(root, 1)).toBe(2);
  });

  it('should return -1 when the target is larger than the largest node', () => {
    expect(fn(root, 15)).toBe(-1);
  });

  it('should return the correct ceil when the root is a potential candidate', () => {
    expect(fn(root, 7)).toBe(8);
  });

  it('should return the largest value when the target is between the second largest and the largest', () => {
    expect(fn(root, 13)).toBe(14);
  });
});
