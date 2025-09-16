import {traverseAllNodes} from '@/data-structure/tree/binary/traversal';
import {BinaryTreeNode} from '@/data-structure/tree/binary';

/**
 * URL: https://www.geeksforgeeks.org/dsa/sum-k-smallest-elements-bst/
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 * Time Complexity: O(h + k) 최소 노드 찾아가는데 h, 이후 k개 순회
 * Auxiliary Space: O(h)
 */
export function sumKSmallestBST(root: BinaryTreeNode<number> | undefined, k: number) {
  if (root === undefined || k <= 0) {
    return 0;
  }

  let count = 0;
  let sum = 0;

  /**
   * 전체 노드를 순회하니까 O(n)인것같지만,
   * 1. BST는 inorder로 순회하면 오름차순으로 순회를 하게 되고,
   * 2. 다 세면 중간에 바로 break 해서 더 안세기 때문에
   * O(n)이 아님.
   */
  for (const {node: {data}} of traverseAllNodes(root, {traversal: 'inorder'})) {
    sum += data;
    count++;

    if (count >= k) {
      break;
    }
  }

  return sum;
}
