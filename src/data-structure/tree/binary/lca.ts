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

/**
 * URL: https://www.geeksforgeeks.org/dsa/lowest-common-ancestor-binary-tree-set-1/#expected-approach-on-time-and-oh-space
 *
 * 1. LCA 찾기
 * 2. LCA 후보찾기
 *
 * TODO 전체적으로 다 절묘함. 뭔가 잘 이해가안됨.
 */
function unsolved<D>(root: BinaryTreeNode<D> | undefined, n1: D, n2: D): BinaryTreeNode<D> | undefined {
  if (root === undefined)
    return undefined;

  // 역할 1. LCA 찾기
  // TODO 여기서 바로 return 해도 되는가? 따져보면 맞긴한데 되게 절묘하네
  // 케이스 1. root node, root.left node 2개가 인자로 들어오면 root로 잘 반환되긴 하니까.
  // 케이스 2. 저 멀리 떨어진 2개의 노드가 들어온 경우 각 노드 하나씩 여기서 반환될거니까
  if (root.data === n1 || root.data === n2)
    return root;

  let leftLca = unsolved(root.left, n1, n2);
  let rightLca = unsolved(root.right, n1, n2);

  // 역할 1. LCA 찾기
  // 케이스 2. 저 멀리 떨어진 노드 2개가 들어온다고 하면 여기서 잘 LCA가 찾아길테니까
  if (leftLca && rightLca)
    return root;

  // 역할 2. LCA 후보찾기
  // 케이스 2. 저 멀리 떨어진 노드 2개가 들어온다고 하면 여기서 후보가 반환될테니까.
  return leftLca ? leftLca : rightLca;
}
