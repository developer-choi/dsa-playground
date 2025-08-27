import {BinaryTreeNode} from '@/data-structure/tree/binary';
import {traverseBST} from '@/data-structure/tree/binary/search/traversal';
import {determineBstDirection} from '@/data-structure/tree/binary/search/index';

/**
 * URL: https://www.geeksforgeeks.org/dsa/insertion-in-binary-search-tree/
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 *
 * Time Complexity
 * 1. O(h) - BST인 경우
 * 2. O(n) - Skewed Tree인 경우
 *
 * Auxiliary Space: 위와 동일, h만큼 재귀스택이 생기기 때문.
 */
export function recursiveInsertBST(root: BinaryTreeNode<number> | undefined, data: number): BinaryTreeNode<number> {
  if (root === undefined) {
    return new BinaryTreeNode(data);
  }

  function recursive(node: BinaryTreeNode<number>) {
    const direction = determineBstDirection(node, data);
    /** Point
     * Tree는 단방향 노드를 사용했기 때문에, 원하는 노드를 찾았더라도,
     * 이전 노드에 접근할 수 없음.
     * 그래서 체크할 때 현재가 아닌 다음노드를 체크했음.
     */
    if (node[direction]) {
      recursive(node[direction]);
    } else {
      node[direction] = new BinaryTreeNode(data);
    }
  }

  recursive(root);
  return root;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/insertion-in-binary-search-tree/
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 *
 * Time Complexity: 위의 재귀방식과 동일
 * Auxiliary Space: O(1)
 */
export function iterativeInsertBST(root: BinaryTreeNode<number> | undefined, data: number): BinaryTreeNode<number> {
  if (root === undefined) {
    return new BinaryTreeNode(data);
  }

  for (const {node} of traverseBST(root, data)) {
    const nextDirection = determineBstDirection(node, data);
    // 이 코드라인에 대한 주석은 recursiveInsertBST() 동일 코드라인 참고
    if (!node[nextDirection]) {
      node[nextDirection] = new BinaryTreeNode(data);
      break;
    }
  }

  return root;
}
