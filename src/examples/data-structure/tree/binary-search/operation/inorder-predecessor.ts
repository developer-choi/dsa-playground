import {BinaryTreeNode, findFarthestNode} from '@/examples/data-structure/tree/complete-binary';
import {determineBstDirection} from '@/examples/data-structure/tree/binary-search';

/**
 * URL: https://www.geeksforgeeks.org/dsa/inorder-predecessor-in-binary-search-tree/
 * Doc: https://docs.google.com/document/d/1m-20HfhQLC125fren7qysz80xt9lyJdtKUhqGmLR9_g/edit?tab=t.0
 * Time Complexity: O(h)
 * Auxiliary Space: O(1)
 */
export function recursiveInorderPredecessorBST(root: BinaryTreeNode<number> | undefined, target: number): number | undefined {
  let potentialPredecessor: number | undefined = undefined;

  function recursive(node: BinaryTreeNode<number> | undefined) {
    if (node === undefined) {
      return undefined; // 만약 node.data과 동일한 target을 못찾은 경우에도 여기를 통해 결과적으로 undefined가 반환됨.
    }

    /**
     * If target > current node value, current node is potential predecessor - update predecessor and move right.
     * 공식문서에서 이 부분에 대한 코드
     */
    if (node.data < target) {
      potentialPredecessor = node.data;
    }

    if (node.data !== target) {
      const direction = determineBstDirection(node, target);
      return recursive(node[direction]);
    }

    // Case 1. target 노드 왼쪽에 노드가 있는 경우
    if (node.left) {
      return findFarthestNode(node.left, 'right').data;
    } else {
      // Case 2. 노드 왼쪽에 노드가 없는 경우 최근에 저장해둔 potentialPredecessor 반환
      return potentialPredecessor;
    }
  }

  return recursive(root);
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/inorder-predecessor-in-binary-search-tree/
 * Doc: https://docs.google.com/document/d/1m-20HfhQLC125fren7qysz80xt9lyJdtKUhqGmLR9_g/edit?tab=t.0
 * Time Complexity: O(h)
 * Auxiliary Space: O(1)
 */
export function iterativeInorderPredecessorBST(root: BinaryTreeNode<number> | undefined, target: number): number | undefined {
  let potentialPredecessor: number | undefined = undefined;
  let current: BinaryTreeNode<number> | undefined = root;

  /**
   * 1. target과 값이 동일한 노드가 나올 때 까지 순회를 하며,
   * 2. potentialPredecessor를 꾸준히 업데이트
   */
  while (current) {
    if (current.data < target) {
      potentialPredecessor = current.data;
    }

    if (current.data !== target) {
      const direction = determineBstDirection(current, target);
      current = current[direction];
    } else {
      break;
    }
  }

  // target과 동일한 노드를 못찾은 경우 무조건 undefined 반환. potentialPredecessor는 이 경우 무시되야함.
  if (current?.data !== target) {
    return undefined;
  }

  // Case 1. target 노드 왼쪽에 노드가 있는 경우
  if (current.left) {
    return findFarthestNode(current.left, 'right').data;
  }

  // Case 2. 노드 왼쪽에 노드가 없는 경우 최근에 저장해둔 potentialPredecessor 반환
  return potentialPredecessor;
}
