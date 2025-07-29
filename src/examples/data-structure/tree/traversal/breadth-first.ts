import {BinaryTreeNode} from '@/examples/data-structure/tree';

/**
 * URL: https://www.geeksforgeeks.org/dsa/level-order-tree-traversal/#approach-1-using-stack-recursive-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
 */
export function recursiveBreadthFirstTraversalTree<D>(root: BinaryTreeNode<D>): D[][] {
  let result: D[][] = [];

  function recursive(node: BinaryTreeNode<D>, level: number) {
    if (!result[level]) {
      result[level] = [node.data];

    } else {
      result[level].push(node.data);
    }

    if (node.left) {
      recursive(node.left, level + 1);
    }

    if (node.right) {
      recursive(node.right, level + 1);
    }
  }

  recursive(root, 0);

  return result;
}
