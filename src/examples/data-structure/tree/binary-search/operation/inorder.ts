import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {determineBstDirection, getSuccessor} from '@/examples/data-structure/tree/binary-search';

/**
 * URL: https://www.geeksforgeeks.org/dsa/inorder-successor-in-binary-search-tree/
 * Doc: https://docs.google.com/document/d/1m-20HfhQLC125fren7qysz80xt9lyJdtKUhqGmLR9_g/edit?tab=t.0
 * Time Complexity: O(h)
 * Auxiliary Space: O(h)
 */
export function recursiveInorderSuccessorBST(root: BinaryTreeNode<number> | undefined, target: number): number | undefined {
  let potentialSuccessor: number | undefined = undefined;

  function recursive(node: BinaryTreeNode<number> | undefined) {
    if (!node) {
      return undefined;
    }

    /**
     * If current node is greater , then it is a potential successor, we mark it as successor and proceed to left
     * 공식문서에서 이 부분에 대한 코드
     */
    if (node.data > target) {
      potentialSuccessor = node.data;
    }

    if (node.data !== target) {
      const direction = determineBstDirection(node, target);
      return recursive(node[direction]);
    }

    // Case 1. node.right 가 있는 경우
    if (node.right !== undefined) {
      return getSuccessor(node).data;
      // Case 2. node.right가 없는 경우
    } else {
      return potentialSuccessor;
    }
  }

  return recursive(root);
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/inorder-successor-in-binary-search-tree/
 * Doc: https://docs.google.com/document/d/1m-20HfhQLC125fren7qysz80xt9lyJdtKUhqGmLR9_g/edit?tab=t.0
 * Time Complexity: O(h)
 * Auxiliary Space: O(1)
 */
export function iterativeInorderSuccessorBST(root: BinaryTreeNode<number> | undefined, target: number): number | undefined {
  let current: BinaryTreeNode<number> | undefined = root;
  let potentialSuccessor: number | undefined = undefined;

  /**
   * 1. target과 값이 동일한 노드가 나올 때 까지 순회를 하며,
   * 2. potentialSuccessor를 꾸준히 업데이트
   */
  while (current) {
    if (current.data > target) {
      potentialSuccessor = current.data;
    }

    if (current.data !== target) {
      const direction = determineBstDirection(current, target);
      current = current[direction];
    } else {
      break;
    }
  }

  // target과 동일한 노드를 못찾은 경우 무조건 undefined 반환. potentialSuccessor는 이 경ㅇ 무시되야함.
  if (current?.data !== target) {
    return undefined;
  }

  // Case 1. target 노드 오른쪽에 다른 노드가 있는 경우
  if (current.right) {
    return getSuccessor(current).data;
  }

  // Case 2. 노드 오른쪽에 다른 노드가 없는 경우 그냥 종료하고 최근에 저장해둔 potentialSuccessor 반환
  return potentialSuccessor;
}
