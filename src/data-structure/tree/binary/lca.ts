import {BinaryTreeNode} from '@/data-structure/tree/binary/index';

/**
 * URL: https://www.geeksforgeeks.org/dsa/lowest-common-ancestor-binary-tree-set-1/#using-arrays-to-store-paths-of-nodes-from-root-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1hmQ93jf-hPjph7pKNf1hPJkwa-THOQS3iI7lYYnExTM/edit?tab=t.0
 * Time Complexity: O(n^2)
 * Auxiliary Space: O(n) (보조배열 2개)
 */
export function comparePathFindLCA(root: BinaryTreeNode<number> | undefined, a: number, b: number): number | undefined {
  if (root === undefined) {
    return undefined;
  }

  const pathA = findPath(root, a);
  const pathB = findPath(root, b);
  const smallerPath = pathA.length > pathB.length ? pathB : pathA;
  const longerPath = pathA.length > pathB.length ? pathA : pathB;

  let result: number | undefined;

  for (const data of smallerPath) {
    // TODO 순회할 때마다 O(n)이 필요함. Array 라서. 일단 문제에서는 Array로 풀었으니 나도 Array로 풀거고, Set에 노드를 저장하는방식으로 하게되면 총 O(n)으로 개선이 가능 해보임.
    if (longerPath.includes(data)) {
      result = data;
    }
  }

  return result;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/lowest-common-ancestor-binary-tree-set-1/#using-arrays-to-store-paths-of-nodes-from-root-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1hmQ93jf-hPjph7pKNf1hPJkwa-THOQS3iI7lYYnExTM/edit?tab=t.0
 */
export function findPath(root: BinaryTreeNode<number> | undefined, target: number): number[] {
  let paths: number[] = [];

  function preorder(node: BinaryTreeNode<number> | undefined): boolean {
    if (node === undefined) {
      return false;
    }

    paths.push(node.data);

    if (node.data === target) {
      return true;
    }

    const isFound = preorder(node.left) || preorder(node.right);

    if (!isFound) {
      paths.pop();
    }

    return isFound;
  }

  preorder(root);
  return paths;
}
