import {BinaryTreeNode} from '@/data-structure/tree/binary/index';
import {traverseAllNodes} from '@/data-structure/tree/binary/traversal';

/**
 * URL: https://www.geeksforgeeks.org/dsa/diameter-of-a-binary-tree/#naive-approach-using-recursion-on2-time-and-oh-space
 * Doc: https://docs.google.com/document/d/1hmQ93jf-hPjph7pKNf1hPJkwa-THOQS3iI7lYYnExTM/edit?tab=t.0#heading=h.tv71ehud6a1w
 * Time Complexity: O(n^2) - 모든 노드를 한번 순회하는데 O(n), 노드 한번당 전체 노드 한번 싹 돌면서 높이를 구해야해서 또 O(n), 곱해서 O(n^2)
 * Auxiliary Space: O(h)
 */
export function getHeightDiameter<D>(root: BinaryTreeNode<D> | undefined) {
  let maxDiameter = 0;

  for (const {node} of traverseAllNodes(root, 'inorder')) {
    // 자식 노드 높이 + 현재 노드와 자식노드 사이 거리 1만큼 보정
    const leftHeight = getHeightOfNode(node.left) + (node.left ? 1 : 0);
    const rightHeight = getHeightOfNode(node.right) + (node.right ? 1 : 0);
    const height = leftHeight + rightHeight;

    if (maxDiameter < height) {
      maxDiameter = height;
    }
  }

  return maxDiameter;
}

export function getHeightOfNode(node: BinaryTreeNode<any> | undefined): number {
  if (node === undefined) {
    return 0;
  }

  function recursive(node: BinaryTreeNode<any> | undefined): number {
    if (node === undefined) {
      return 0; // 밑에 -1 만나서 결과적으로 0되기 위해
    }

    const leftHeight = recursive(node.left) + 1;
    const rightHeight = recursive(node.right) + 1;
    return Math.max(leftHeight, rightHeight);
  }

  return recursive(node) - 1;
}
