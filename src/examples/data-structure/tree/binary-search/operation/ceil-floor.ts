import {BinaryTreeNode} from '@/examples/data-structure/tree/complete-binary';
import {determineBstDirection} from '@/examples/data-structure/tree/binary-search';

/**
 * ceil() URL: https://www.geeksforgeeks.org/dsa/floor-and-ceil-from-a-bst/
 * floor() URL: https://www.geeksforgeeks.org/dsa/floor-in-binary-search-tree-bst/#expected-approach-1-using-recursion-oh-time-and-oh-space
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 * Time Complexity: O(h)
 * Auxiliary Space: O(h)
 */
export function recursiveCeilOrFloorBST(mode: CeilOrFloorMode, root: BinaryTreeNode<number> | undefined, target: number): number | undefined {
  let candidate: number | undefined = undefined;

  function recursive(node: BinaryTreeNode<number> | undefined) {
    if (node === undefined) {
      return;
    }

    /** Question. 후보를 위 노드에서 아래 노드로 내려가면서 계속 업데이트해도 괜찮나요?
     * ==>
     * Ceil: 후보(node.data >= target)를 찾으면,
     * 더 작은 후보를 찾기 위해 "반드시" 왼쪽으로 이동하게 됩니다. - determineBstDirection()
     * 따라서 마지막에 저장된 후보가 "target보다 크거나 같은 값"들 중 가장 작은 값이 됩니다.
     *
     * Floor: 후보(node.data <= target)를 찾으면,
     * 더 큰 후보를 찾기 위해 "반드시" 오른쪽으로 이동하게 됩니다. - determineBstDirection()
     * 따라서 마지막에 저장된 후보가 "target보다 작거나 같은 값"들 중 가장 큰 값이 됩니다.
     */
    if (isCandidate(mode, node, target)) {
      candidate = node.data;
    }

    if (node.data === target) {
      return;
    }

    const direction = determineBstDirection(node, target);
    recursive(node[direction]);
  }

  recursive(root);
  return candidate;
}

/**
 * ceil() URL: https://www.geeksforgeeks.org/dsa/floor-and-ceil-from-a-bst/
 * floor() URL: https://www.geeksforgeeks.org/dsa/floor-in-binary-search-tree-bst/#expected-approach-1-using-recursion-oh-time-and-oh-space
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 * Time Complexity: O(h)
 * Auxiliary Space: O(1)
 */
export function iterativeCeilOrFloorBST(mode: CeilOrFloorMode, root: BinaryTreeNode<number> | undefined, target: number): number | undefined {
  let current: BinaryTreeNode<number> | undefined = root;
  let candidate: number | undefined = undefined;

  while (current) {
    if (isCandidate(mode, current, target)) {
      candidate = current.data;
    }

    if (current.data === target) {
      break;
    }

    const direction = determineBstDirection(current, target);
    current = current[direction];
  }

  return candidate;
}

export type CeilOrFloorMode = 'ceil' | 'floor';

/**
 * ceil = target보다 크거나 같은 노드들 중 제일 작은 값
 * floor = target보다 작거나 같은 노드들 중 제일 큰 값
 */
function isCandidate(mode: CeilOrFloorMode, node: BinaryTreeNode<number>, target: number) {
  if (mode === 'ceil') {
    return node.data >= target; // ceil = 일단 target보다 커야 후보가 될 수 있음.
  } else {
    return node.data <= target; // floor = 일단 target보다 작아야 후보가 될 수 있음.
  }
}
