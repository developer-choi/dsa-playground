import {getMiddleIndex} from '@/utils/math';

/**
 * Doc: https://docs.google.com/document/d/1oryoLxF3hazneteLVUH8TAjlxVAkKZtTc-pUVzjuGKA/edit?tab=t.0
 * Official: https://www.geeksforgeeks.org/dsa/binary-search/
 */
export default function iterativeBinarySearch(array: number[], target: number): number {
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    const middleIndex = getMiddleIndex(start, end);
    const middleValue = array[middleIndex];

    if (middleValue === target) {
      return middleIndex;
    }

    if (middleValue > target) {
      end = middleIndex - 1;
    } else {
      start = middleIndex + 1;
    }
  }

  return -1;
}
