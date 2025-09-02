import {BinaryTreeNode} from '@/data-structure/tree/binary/index';

/**
 * URL: https://www.geeksforgeeks.org/dsa/lowest-common-ancestor-binary-tree-set-1/#using-arrays-to-store-paths-of-nodes-from-root-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1hmQ93jf-hPjph7pKNf1hPJkwa-THOQS3iI7lYYnExTM/edit?tab=t.0
 * Time Complexity: O(n)
 * Auxiliary Space: O(n) (보조배열 2개)
 */
export function comparePathFindLCA<D>(root: BinaryTreeNode<D> | undefined, a: D, b: D): D | undefined {
  if (root === undefined) {
    return undefined;
  }

  const pathA = findPath(root, a);
  const pathB = findPath(root, b);

  let i;

  // 2개의 배열을 동시에 왼쪽에서부터 비교한다는 느낌을 이런 코드로 표현했음.
  for (i = 0 ; i < pathA.length && i < pathB.length ; i++) {
    if (pathA[i] !== pathB[i]) {
      return pathA[i - 1];
    }
  }

  // pathB 이던 pathA던 동일한 결과가 나옴.
  return pathA[i - 1];
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/lowest-common-ancestor-binary-tree-set-1/#using-arrays-to-store-paths-of-nodes-from-root-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1hmQ93jf-hPjph7pKNf1hPJkwa-THOQS3iI7lYYnExTM/edit?tab=t.0
 */
export function findPath<D>(root: BinaryTreeNode<D> | undefined, target: D): D[] {
  let paths: D[] = [];

  function preorder(node: BinaryTreeNode<D> | undefined): boolean {
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
