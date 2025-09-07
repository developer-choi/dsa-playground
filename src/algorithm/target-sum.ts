import {BinaryTreeNode} from '@/data-structure/tree/binary';
import {traverseAllNodes} from '@/data-structure/tree/binary/traversal';

/**
 * URL: https://www.geeksforgeeks.org/dsa/number-of-ways-to-calculate-a-target-number-using-only-array-elements/
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/43165
 * Doc: https://docs.google.com/document/d/1hmQ93jf-hPjph7pKNf1hPJkwa-THOQS3iI7lYYnExTM/edit?tab=t.0#heading=h.tv71ehud6a1w
 * Time Complexity: O(2^n)
 */
export function binaryTreeTargetSum(array: number[], target: number): number {
  const root = unfoldArray(array);
  let casesCount = 0;

  Array.from(traverseAllNodes<number, number>(root, {
    traversal: 'preorder',
    accumulator: ({node, lastParent}) => {
      const pathSum = (lastParent?.accumulatedValue ?? 0);

      if (node.isLeaf()) {
        const isTarget = pathSum + node.data === target;

        if (isTarget) {
          casesCount++;
        }
      }

      return pathSum + node.data;
    }
  }));

  return casesCount;
}

function unfoldArray(array: number[]): BinaryTreeNode<number> {
  const root = new BinaryTreeNode(0);

  let nextIterating: BinaryTreeNode<number>[] = [root];
  for (const data of array) {
    const iterating = nextIterating;
    nextIterating = [];

    for (const node of iterating) {
      node.left = new BinaryTreeNode(data);
      node.right = new BinaryTreeNode(-data);
      nextIterating.push(node.left, node.right);
    }
  }

  return root;
}
