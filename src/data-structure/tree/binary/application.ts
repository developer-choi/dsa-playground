import {BinaryTreeNode} from '@/data-structure/tree/binary/index';
import {TraversalTreeType, traverseAllNodes} from '@/data-structure/tree/binary/traversal';

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-the-maximum-depth-or-height-of-a-tree/
 * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
 */
export function getMaxDepthInTree<D>(root: BinaryTreeNode<D> | undefined, traversal: TraversalTreeType): number | -1 {
  let maxDepth = -1;

  for (const {level} of traverseAllNodes(root, {traversal})) {
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

  for (const _ of traverseAllNodes(root, {traversal})) {
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

  for (const {node: {data}} of traverseAllNodes(root, {traversal})) {
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

  for (const {node: {data}} of traverseAllNodes(root, {traversal})) {
    sum += data;
  }

  return root.data * 2 === sum;
}

export function getRangeBinaryTree(root: BinaryTreeNode<number> | undefined, range?: {max?: number, min?: number}): number[] {
  const max = range?.max ?? Infinity;
  const min = range?.min ?? -Infinity;
  const result: number[] = [];

  if (min > max) {
    console.error('최소값이 최대값 보다 크면 안됩니다.');
    return [];
  }

  for (const {node: {data}} of traverseAllNodes(root, {traversal: 'inorder'})) {
    if (min <= data && data <= max) {
      result.push(data);
    }

    if (data > max) {
      break;
    }
  }

  return result;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/sum-numbers-formed-root-leaf-paths/#alternate-approach-using-iterative-method-on-time-and-oh-space
 * Doc: https://docs.google.com/document/d/1hmQ93jf-hPjph7pKNf1hPJkwa-THOQS3iI7lYYnExTM/edit?tab=t.0
 * Time Complexity: O(n)
 * Auxiliary Space: O(h)
 */
export function sumOfLeafs(root: BinaryTreeNode<number> | undefined): number {
  if (!root) {
    return 0;
  }

  let totalSum = 0;

  // Generator를 끝까지 실행하기 위한 Array.from() 문법
  Array.from(traverseAllNodes<number, number>(root, {
    traversal: 'preorder', // 부모를 먼저 방문하는 순회인 postorder, preoder면 가능
    accumulator: (context) => {
      const parentPathSum = context.lastParent?.accumulatedValue ?? 0;
      const currentPathSum = parentPathSum * 10 + context.node.data;

      if (context.node.isLeaf()) {
        totalSum += currentPathSum;
      }

      return currentPathSum;
    },
  }));

  return totalSum;
}