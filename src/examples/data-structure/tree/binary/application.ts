import {BinaryTreeNode} from '@/examples/data-structure/tree/binary/index';
import {TraversalTreeType, traverseAllNodes} from '@/examples/data-structure/tree/binary/traversal';

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-the-maximum-depth-or-height-of-a-tree/
 * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
 */
export function getMaxDepthInTree<D>(root: BinaryTreeNode<D> | undefined, traversal: TraversalTreeType): number | -1 {
  let maxDepth = -1;

  for (const {level} of traverseAllNodes(root, traversal)) {
    if (maxDepth < level) {
      maxDepth = level;
    }
  }

  return maxDepth;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/write-a-c-program-to-calculate-size-of-a-tree/
 * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
 */
export function getNodeCount(root: BinaryTreeNode<any>, traversal: TraversalTreeType): number {
  // return [...traverseTree(root, traversal)].length; 이렇게 하면 Auxiliary Space가 O(n)이 됨.
  let count = 0;

  for (const _ of traverseAllNodes(root, traversal)) {
    count++;
  }

  return count;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-maximum-or-minimum-in-binary-tree/
 * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
 */
export function getBoundary(root: BinaryTreeNode<number> | undefined, traversal: TraversalTreeType) {
  if (root === undefined) {
    return {
      min: undefined,
      max: undefined
    };
  }

  let min = Infinity;
  let max = -Infinity;

  for (const {node: {data}} of traverseAllNodes(root, traversal)) {
    max = Math.max(data, max);
    min = Math.min(data, min);
  }

  return {
    min, max,
  };
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/check-if-a-given-binary-tree-is-sumtree/
 * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
 */
export function isSumTree(root: BinaryTreeNode<number>, traversal: TraversalTreeType): boolean {
  let sum = 0;

  for (const {node: {data}} of traverseAllNodes(root, traversal)) {
    sum += data;
  }

  return root.data * 2 === sum;
}
