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
  const smallerPath = pathA.size > pathB.size ? pathB : pathA;
  const longerPath = pathA.size > pathB.size ? pathA : pathB;

  let result: D | undefined;

  for (const node of smallerPath) {
    if (longerPath.has(node)) {
      result = node.data;
    }
  }

  return result;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/lowest-common-ancestor-binary-tree-set-1/#using-arrays-to-store-paths-of-nodes-from-root-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1hmQ93jf-hPjph7pKNf1hPJkwa-THOQS3iI7lYYnExTM/edit?tab=t.0
 */
export function findPath<D>(root: BinaryTreeNode<D> | undefined, target: D): Set<BinaryTreeNode<D>> {
  let paths = new Set<BinaryTreeNode<D>>();

  function preorder(node: BinaryTreeNode<D> | undefined): boolean {
    if (node === undefined) {
      return false;
    }

    paths.add(node);

    if (node.data === target) {
      return true;
    }

    const isFound = preorder(node.left) || preorder(node.right);

    if (!isFound) {
      paths.delete(node);
    }

    return isFound;
  }

  preorder(root);
  return paths;
}
