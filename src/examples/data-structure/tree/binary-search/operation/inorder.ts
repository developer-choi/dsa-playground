import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {determineBstDirection, getSuccessor} from '@/examples/data-structure/tree/binary-search';

/**
 * URL: https://www.geeksforgeeks.org/dsa/inorder-successor-in-binary-search-tree/
 * Doc: https://docs.google.com/document/d/1m-20HfhQLC125fren7qysz80xt9lyJdtKUhqGmLR9_g/edit?tab=t.0
 * Time Complexity: O(h)
 * Auxiliary Space: O(h)
 */
export function recursiveInorderSuccessorBST(root: BinaryTreeNode<number> | undefined, target: number): number | undefined {
  if (root === undefined) {
    return undefined;
  }

  let successor: number | undefined = undefined;

  function recursive(node: BinaryTreeNode<number> | undefined) {
    if (!node) {
      return undefined;
    }

    /**
     * If current node is greater , then it is a potential successor, we mark it as successor and proceed to left
     * 공식문서에서 이 부분에 대한 코드
     */
    if (node.data > target) {
      successor = node.data;
    }

    if (node.data !== target) {
      const direction = determineBstDirection(node, target);
      return recursive(node[direction]);
    }

    // Case 1. node.right 가 있는 경우
    if (node.right !== undefined) {
      return getSuccessor(node).data;
      // Case 2. node.right가 없는 경우
    } else {
      return successor;
    }
  }

  return recursive(root);
}
