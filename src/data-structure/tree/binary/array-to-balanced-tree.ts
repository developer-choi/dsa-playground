import {BinaryTreeNode} from '@/data-structure/tree/binary/index';
import {getMiddleIndex, getMiddleItemOfArray} from '@/utils/extend/browser/math';

/**
 * URL: https://www.geeksforgeeks.org/dsa/sorted-array-to-balanced-bst/
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 * Time Complexity: O(n), 배열이 n개면 재귀도 n번 발생함.
 * Auxiliary Space: O(log n), 재귀 스택은 log n개 만큼 생성됨. Balanced Tree 이기 때문에.
 *
 * @param array 정렬된 값을 전달할 경우, 결과물은 BST가 된다.
 * @return Balanced Tree를 반환함.
 */
export function recursiveArrayToBalancedTree<D>(array: D[]): BinaryTreeNode<D> | undefined {
  function recursive(startIndex: number, endIndex: number): BinaryTreeNode<D> | undefined {
    if (startIndex > endIndex) {
      return undefined;
    }

    const middleIndex = getMiddleIndex(startIndex, endIndex);
    const root = new BinaryTreeNode(array[middleIndex]);
    root.left = recursive(startIndex, middleIndex - 1);
    root.right = recursive(middleIndex + 1, endIndex);

    return root;
  }

  return recursive(0, array.length - 1);
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/sorted-array-to-balanced-bst/#expected-approach-2-using-queue-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1jCfMEmybcdEaWi0f__mAV1kNolpttWlrBn2q-pjf9E4/edit?tab=t.0
 * Time Complexity: O(n), 배열 요소 갯수 n개만큼의 순회가 발생함.
 * Auxiliary Space: O(1), 추가로 필요한 보조 저장공간이 없음. 큐라고 해봐야 최대 2개 까지 저장되니까.
 *
 * @param array 정렬된 값을 전달할 경우, 결과물은 BST가 된다.
 * @return Balanced Tree를 반환함.
 */
export function iterativeArrayToBalancedTree<D>(array: D[]): BinaryTreeNode<D> | undefined {
  if (array.length === 0) {
    return undefined;
  }

  const root = new BinaryTreeNode(getMiddleItemOfArray(array));

  /**
   * 다음에 순회 할
   * 1. 서브 루트 노드
   * 2. 그 노드의 자식의 범위
   */
  const nextSubRoot = [{node: root, startIndex: 0, endIndex: array.length - 1}];

  while (nextSubRoot.length) {
    const iterativeCount = nextSubRoot.length;

    for (let i = 0; i < iterativeCount; i++) {
      const {node, startIndex, endIndex} = nextSubRoot.shift() as Exclude<typeof nextSubRoot[0], undefined>;
      const middleIndex = getMiddleIndex(startIndex, endIndex);

      if (startIndex <= middleIndex - 1) {
        const leftMiddleIndex = getMiddleIndex(startIndex, middleIndex - 1);
        const children = new BinaryTreeNode(array[leftMiddleIndex]);
        node.left = children;

        nextSubRoot.push({
          node: children,
          startIndex,
          endIndex: middleIndex - 1
        });
      }

      if (middleIndex + 1 <= endIndex) {
        const rightMiddleIndex = getMiddleIndex(middleIndex + 1, endIndex);
        const children = new BinaryTreeNode(array[rightMiddleIndex]);
        node.right = children;

        nextSubRoot.push({
          node: children,
          startIndex: middleIndex + 1,
          endIndex
        });
      }
    }
  }

  return root;
}

// https://www.geeksforgeeks.org/dsa/sorted-array-to-balanced-bst/#expected-approach-1-using-recursion-on-time-and-on-space
export function officialArrayToBalancedTree(array: number[]) {
  // Recursive function to construct BST
  function sortedArrayToBSTRecur(array: number[], start: number, end: number) {
    if (start > end) return undefined;

    // Find the middle element
    let mid = start + Math.floor((end - start) / 2);

    // Create root node
    let root = new BinaryTreeNode(array[mid]);

    // Create left subtree
    root.left = sortedArrayToBSTRecur(array, start, mid - 1);

    // Create right subtree
    root.right = sortedArrayToBSTRecur(array, mid + 1, end);

    return root;
  }

  return sortedArrayToBSTRecur(array, 0, array.length - 1);
}
