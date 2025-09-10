import {getFamilyIndexesFromCompleteBinaryTree} from '@/data-structure/tree/binary/complete/array';

export function iterativeIsMaxHeap(array: number[]) {
  // 배열 전체를 순회 할 필요가 없고, 가장 마지막 부모 노드 까지만 순회하며 자식노드, 부모노드의 크기만 비교하면됨.
  const {parent: lastParentIndex} = getFamilyIndexesFromCompleteBinaryTree(array, array.length - 1);

  for (let i = 0; i <= lastParentIndex; i++) {
    const {left, right} = getFamilyIndexesFromCompleteBinaryTree(array, i);
    const data = array[i];

    if ((left !== -1 && data < array[left]) || (right !== -1 && data < array[right])) {
      return false;
    }
  }

  return true;
}
