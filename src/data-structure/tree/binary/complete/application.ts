import {BinaryTreeNode} from '@/data-structure/tree/binary';

/**
 * URL: https://www.geeksforgeeks.org/dsa/symmetric-tree-tree-which-is-mirror-image-of-itself/
 * Doc: https://docs.google.com/document/d/1hmQ93jf-hPjph7pKNf1hPJkwa-THOQS3iI7lYYnExTM/edit?tab=t.0
 */
export function isSymmetricBinaryTree(root: BinaryTreeNode<number> | undefined): boolean {
  if (root === undefined) {
    return true;
  }

  let pairs: [BinaryTreeNode<number> | undefined, BinaryTreeNode<number> | undefined][] = [[root.left, root.right]];

  while (pairs.length) {
    const iteratingPairs = [...pairs];
    pairs = [];

    // TODO 이 방식으로 BFS도 수정하기. .shift()랑 while()안에 들어가는거 때문에 개햇갈림. 반복문 그렇게쓰지말기.
    for (const [a, b] of iteratingPairs) {
      if (a === undefined && b === undefined) {
        continue;
      }

      if (a === undefined || b === undefined || a.data !== b.data) {
        return false;
      }

      pairs.push([a.left, b.right]);
      pairs.push([a.right, b.left]);
    }
  }

  return true;
}
