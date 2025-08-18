import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {determineBstDirection} from '@/examples/data-structure/tree/binary-search';

/**
 * URL: https://www.geeksforgeeks.org/dsa/floor-and-ceil-from-a-bst/
 * Doc: https://docs.google.com/document/d/1m-20HfhQLC125fren7qysz80xt9lyJdtKUhqGmLR9_g/edit?tab=t.0
 * Time Complexity: O(h)
 * Auxiliary Space: O(h)
 */
export function recursiveCeilBST(root: BinaryTreeNode<number>, target: number): number | -1 {
  let result = -1;

  function recursive(node: BinaryTreeNode<number> | undefined) {
    if (node === undefined) {
      return;
    }

    if (node.data >= target) {
      result = node.data;
    }

    if (node.data === target) {
      return;
    }

    const direction = determineBstDirection(node, target);
    recursive(node[direction]);
  }

  recursive(root);

  return result;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/floor-and-ceil-from-a-bst/
 * Doc: https://docs.google.com/document/d/1m-20HfhQLC125fren7qysz80xt9lyJdtKUhqGmLR9_g/edit?tab=t.0
 * Time Complexity: O(h)
 * Auxiliary Space: O(1)
 */
export function iterativeCeilBST(root: BinaryTreeNode<number>, target: number): number | -1 {
  let current: BinaryTreeNode<number> | undefined = root;
  let result = -1;

  while (current) {
    if (current.data >= target) {
      result = current.data;
    }

    if (current.data === target) {
      break;
    }

    const direction = determineBstDirection(current, target);
    current = current[direction];
  }

  return result;
}
