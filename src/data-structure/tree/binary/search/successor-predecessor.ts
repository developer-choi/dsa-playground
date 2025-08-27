import {BinaryTreeNode, findLastNodeInDirection} from '@/data-structure/tree/binary';
import {invertDirection} from '@/data-structure/tree/binary';
import {BinaryTreeDirection} from '@/data-structure/tree/binary';
import {traverseBST} from '@/data-structure/tree/binary/search/traversal';
import {determineBstDirection} from '@/data-structure/tree/binary/search/index';

/**
 * successor URL: https://www.geeksforgeeks.org/dsa/inorder-successor-in-binary-search-tree/
 * predecessor URL: https://www.geeksforgeeks.org/dsa/inorder-predecessor-in-binary-search-tree/
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 * Time Complexity: O(h)
 * Auxiliary Space: O(h)
 */
export function recursiveGetSuccessorOrPredecessorBST(mode: SuccessorOrPredecessorMode, root: BinaryTreeNode<number> | undefined, target: number): number | undefined {
  let potential: number | undefined = undefined;

  function recursive(node: BinaryTreeNode<number> | undefined) {
    if (!node) {
      return undefined; // 만약 node.data과 동일한 target을 못찾은 경우에도 여기를 통해 결과적으로 undefined가 반환됨.
    }

    if (isPotential(mode, node, target)) {
      potential = node.data;
    }

    if (node.data !== target) {
      const direction = determineBstDirection(node, target);
      return recursive(node[direction]);
    }

    return determineFinalResult(mode, node, potential);
  }

  return recursive(root);
}

/**
 * successor URL: https://www.geeksforgeeks.org/dsa/inorder-successor-in-binary-search-tree/
 * predecessor URL: https://www.geeksforgeeks.org/dsa/inorder-predecessor-in-binary-search-tree/
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 * Time Complexity: O(h)
 * Auxiliary Space: O(1)
 */
export function iterativeGetSuccessorOrPredecessorBST(mode: SuccessorOrPredecessorMode, root: BinaryTreeNode<number> | undefined, target: number): number | undefined {
  let current: BinaryTreeNode<number> | undefined = root;
  let potential: number | undefined = undefined;

  /**
   * 1. target과 값이 동일한 노드가 나올 때 까지 순회를 하며,
   * 2. potentialSuccessor를 꾸준히 업데이트
   */
  for (const {node} of traverseBST(root, target)) {
    current = node;

    if (isPotential(mode, node, target)) {
      potential = node.data;
    }

    if (node.data === target) {
      break;
    }
  }

  // target과 동일한 노드를 못찾은 경우 무조건 undefined 반환. potentialSuccessor는 이 경우 무시되야함.
  if (current?.data !== target) {
    return undefined;
  }

  return determineFinalResult(mode, current, potential);
}

export type SuccessorOrPredecessorMode = 'successor' | 'predecessor';

/**
 * successor = target보다 큰 노드들 중 제일 작은 값
 * predecessor = target보다 작은 노드들 중 제일 큰 값
 */
function isPotential(mode: SuccessorOrPredecessorMode, node: BinaryTreeNode<number>, target: number) {
  if (mode === 'successor') {
    /**
     * If current node is greater , then it is a potential successor, we mark it as successor and proceed to left
     * 공식문서에서 이 부분에 대한 코드
     */
    return node.data > target;
  } else {

    /**
     * If target > current node value, current node is potential predecessor - update predecessor and move right.
     * 공식문서에서 이 부분에 대한 코드
     */
    return node.data < target;
  }
}

function determineFinalResult(mode: SuccessorOrPredecessorMode, targetNode: BinaryTreeNode<number>, potential: number | undefined) {
  /** (GFG 공식문서 설명 참고)
   * successor의 경우, target 노드의 "오른쪽"에 자식이 있냐 없냐에 따라 처리가 달라지고,
   * predecessor의 경우, "왼쪽"임.
   */
  const checkDirection: BinaryTreeDirection = mode === 'successor' ? 'right' : 'left'

  // Case 1. 찾는 방향으로 자식노드가 있는 경우
  if (targetNode[checkDirection] !== undefined) {
    return findLastNodeInDirection(targetNode[checkDirection], invertDirection(checkDirection)).data;
  } else {
    // Case 2. 없는 경우 최근에 저장해둔 potential 반환
    return potential;
  }
}
