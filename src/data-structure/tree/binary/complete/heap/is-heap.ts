import {getFamilyIndexesFromCompleteBinaryTree} from '@/data-structure/tree/binary/complete/array';

export function iterativeIsMaxHeap(array: number[]) {
  for (let i = 0; i < array.length; i++) {
    const {left, right} = getFamilyIndexesFromCompleteBinaryTree(array, i);
    const data = array[i];

    if ((left !== -1 && data < array[left]) || (right !== -1 && data < array[right])) {
      return false;
    }
  }

  return true;
}
