import {getFamilyIndexesFromCompleteBinaryTree} from '@/data-structure/tree/binary/complete/array';
import {HeapType} from '@/data-structure/tree/binary/complete/heap/index';

export function iterativeIsHeap(type: HeapType, array: number[]) {
  // 배열 전체를 순회 할 필요가 없고, 가장 마지막 부모 노드 까지만 순회하며 자식노드, 부모노드의 크기만 비교하면됨.
  const {parent: lastParentIndex} = getFamilyIndexesFromCompleteBinaryTree(array, array.length - 1);

  for (let i = 0; i <= lastParentIndex; i++) {
    const {left, right} = getFamilyIndexesFromCompleteBinaryTree(array, i);
    const parent = array[i];

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
  }

  return true;
}
