import {getFamilyIndexesFromCompleteBinaryTree} from '@/data-structure/tree/binary/complete/array';
import {HeapType} from '@/data-structure/tree/binary/complete/heap/index';

/**
 * URL: https://www.geeksforgeeks.org/dsa/how-to-check-if-a-given-array-represents-a-binary-heap/
 * Doc: https://docs.google.com/document/d/1dUt9mYfzFzZBdQBK-qvHiyi2_6nEScqxEQd0IdvJs8c/edit?tab=t.0
 * Time Complexity: O(n)
 * Auxiliary Space: O(h)
 */
export function recursiveIsHeap(type: HeapType, array: number[]): boolean {
  if (array.length === 0) {
    return true;
  }

  function recursive(parentIndex: number): boolean {
    const result = isParentValidWithChildren(type, array, parentIndex);

    if (!result) {
      return false;
    }

    const {left, right} = getFamilyIndexesFromCompleteBinaryTree(array, parentIndex);
    return (left === -1 || recursive(left)) && (right === -1 || recursive(right));
  }

  return recursive(0);
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/how-to-check-if-a-given-array-represents-a-binary-heap/
 * Doc: https://docs.google.com/document/d/1dUt9mYfzFzZBdQBK-qvHiyi2_6nEScqxEQd0IdvJs8c/edit?tab=t.0
 * Time Complexity: O(n)
 * Auxiliary Space: O(1)
 */
export function iterativeIsHeap(type: HeapType, array: number[]): boolean {
  // 배열 전체를 순회 할 필요가 없고, 가장 마지막 부모 노드 까지만 순회하며 자식노드, 부모노드의 크기만 비교하면됨.
  const {parent: lastParentIndex} = getFamilyIndexesFromCompleteBinaryTree(array, array.length - 1);

  for (let i = 0; i <= lastParentIndex; i++) {
    const result = isParentValidWithChildren(type, array, i);

    if (!result) {
      return false;
    }
  }

  return true;
}

function isParentValidWithChildren(type: HeapType, array: number[], parentIndex: number): boolean {
  const {left, right} = getFamilyIndexesFromCompleteBinaryTree(array, parentIndex);
  const parent = array[parentIndex];

  if (left !== -1) {
    const leftChildren = array[left];

    if (type === 'max' && parent < leftChildren) {
      return false;
    } else if(type === 'min' && parent > leftChildren) {
      return false;
    }
  }

  if (right !== -1) {
    const rightChildren = array[right];

    if (type === 'max' && parent < rightChildren) {
      return false;
    } else if(type === 'min' && parent > rightChildren) {
      return false;
    }
  }

  return true;
}
