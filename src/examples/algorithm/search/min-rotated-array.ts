import {getMiddleIndex} from '@/utils/extend/browser/math';

/**
 * Doc: https://docs.google.com/document/d/1oryoLxF3hazneteLVUH8TAjlxVAkKZtTc-pUVzjuGKA/edit?tab=t.0
 * Official: https://www.geeksforgeeks.org/dsa/find-minimum-element-in-a-sorted-and-rotated-array/
 */
export default function findMinRotatedArray(array: number[]) {
  if (array.length === 0) {
    return null;
  }

  return recursive(array, 0, array.length - 1);
}

function recursive(array: number[], startIndex: number, endIndex: number): number {
  if (startIndex >= endIndex) {
    return array[endIndex];
  }

  const middleIndex = getMiddleIndex(startIndex, endIndex);

  if (array[middleIndex] < array[endIndex]) {
    return recursive(array, startIndex, middleIndex);
  } else {
    return recursive(array, middleIndex + 1, endIndex);
  }
}
