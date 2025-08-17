import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {determineBstDirection} from '@/examples/data-structure/tree/binary-search';

/**
 * URL: https://www.geeksforgeeks.org/dsa/floor-in-binary-search-tree-bst/#expected-approach-1-using-recursion-oh-time-and-oh-space
 * Doc: https://docs.google.com/document/d/1m-20HfhQLC125fren7qysz80xt9lyJdtKUhqGmLR9_g/edit?tab=t.0
 * Time Complexity: O(h)
 * Auxiliary Space: O(h)
 */
export function recursiveFloorBST(root: BinaryTreeNode<number>, target: number): number | -1 {
  let result = -1;

  function recursive(node: BinaryTreeNode<number> | undefined) {
    if (!node) {
      return result;
    }

    if (node.data === target) {
      return node.data;
    }

    if (node.data <= target) {
      result = node.data;
    }

    const direction = determineBstDirection(node, target);
    return recursive(node[direction]);
  }

  return recursive(root);
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/floor-in-binary-search-tree-bst/#expected-approach-1-using-recursion-oh-time-and-oh-space
 * Doc: https://www.geeksforgeeks.org/dsa/floor-in-binary-search-tree-bst/#expected-approach-2-iterative-solution-oh-time-and-o1-space
 * Time Complexity: O(h)
 * Auxiliary Space: O(1)
 */
export function iterativeFloorBST(root: BinaryTreeNode<number>, target: number): number | -1 {
  let current: BinaryTreeNode<number> | undefined = root;
  let result = -1;

  while (current) {
    if (current.data === target) {
      return target;
    }

    if (current.data <= target) {
      result = current.data;
    }

    const direction = determineBstDirection(current, target);
    current = current[direction];
  }

  return result;
}
