import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';

/**
 * URL: https://www.geeksforgeeks.org/dsa/insertion-in-binary-search-tree/
 * Doc: https://docs.google.com/document/d/1m-20HfhQLC125fren7qysz80xt9lyJdtKUhqGmLR9_g/edit?tab=t.0
 *
 * Time Complexity
 * 1. O(h) - BST인 경우
 * 2. O(n) - Skewed Tree인 경우
 *
 * Auxiliary Space: 위와 동일, h만큼 재귀스택이 생기기 때문.
 */
export function recursiveInsertBST(root: BinaryTreeNode<number>, data: number) {
  function recursive(node: BinaryTreeNode<number>) {
    const direction: 'left' | 'right' = node.data > data ? 'left' : 'right';

    if (node[direction]) {
      recursive(node[direction]);
    } else {
      node[direction] = new BinaryTreeNode(data);
    }
  }

  recursive(root);
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/insertion-in-binary-search-tree/
 * Doc: https://docs.google.com/document/d/1m-20HfhQLC125fren7qysz80xt9lyJdtKUhqGmLR9_g/edit?tab=t.0
 *
 * Time Complexity: 위의 재귀방식과 동일
 * Auxiliary Space: O(1)
 */
export function iterativeInsertBST(root: BinaryTreeNode<number>, data: number) {
  let nextSearchNode: BinaryTreeNode<number> | undefined = root;

  while (true) {
    const direction: 'left' | 'right' = nextSearchNode.data > data ? 'left' : 'right';

    if (!nextSearchNode[direction]) {
      nextSearchNode[direction] = new BinaryTreeNode(data);
      break;
    } else {
      nextSearchNode = nextSearchNode[direction];
    }
  }
}
