import {BinaryTreeDirection, BinaryTreeNode} from '@/examples/data-structure/tree/binary';

/**
 * https://www.geeksforgeeks.org/dsa/find-the-minimum-element-in-a-binary-search-tree/#expected-approach-iterative-approach-on-time-and-o1-space
 * https://www.geeksforgeeks.org/dsa/find-the-node-with-maximum-value-in-a-binary-search-tree/#expected-approach-iterative-approach-on-time-and-o1-space
 * Time Complexity: O(h)
 * Auxiliary Space: O(1)
 */
export function getBoundary(root: BinaryTreeNode<number> | undefined, boundary: 'min' | 'max'): number | undefined {
  if (!root) {
    return undefined;
  }

  const direction: BinaryTreeDirection = boundary === 'min' ? 'left' : 'right';

  let current: BinaryTreeNode<number> | undefined = root;

  while (current[direction]) {
    current = current[direction];
  }

  return current.data;
}
