import {BinaryTreeNode} from '@/examples/data-structure/tree/binary';
import {traverseBST} from '@/examples/data-structure/tree/binary/search/traversal';
import {determineBstDirection} from '@/examples/data-structure/tree/binary/search/index';

/**
 * URL: https://www.geeksforgeeks.org/dsa/binary-search-tree-set-1-search-and-insertion/
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 *
 * Time Complexity
 * 1. O(h) - BST인 경우
 * 2. O(n) - Skewed Tree인 경우
 *
 * Auxiliary Space: 위와 동일, h만큼 재귀스택이 생기기 때문.
 */
export function recursiveSearchBST(root: BinaryTreeNode<number> | undefined, data: number): boolean {
  if (root === undefined) {
    return false;
  }

  function recursive(node: BinaryTreeNode<number>): boolean {
    if (node.data === data) {
      return true;
    }

    const direction = determineBstDirection(node, data);

    if (!node[direction]) {
      return false;
    } else {
      return recursive(node[direction]);
    }
  }

  return recursive(root);
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/binary-search-tree-set-1-search-and-insertion/
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 *
 * Time Complexity: 위의 재귀방식과 동일
 * Auxiliary Space: O(1)
 */
export function iterativeSearchBST(root: BinaryTreeNode<number> | undefined, data: number): boolean {
  if (root === undefined) {
    return false;
  }

  for (const {node} of traverseBST(root, data)) {
    if (node.data === data) {
      return true;
    }
  }

  return false;
}
