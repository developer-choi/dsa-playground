/**
 * Doc: https://docs.google.com/document/d/1oryoLxF3hazneteLVUH8TAjlxVAkKZtTc-pUVzjuGKA/edit?tab=t.0
 * Official: https://www.geeksforgeeks.org/dsa/binary-search/
 */
export default function recursiveBinarySearch(array: number[], target: number): number {
  return recursive(array, target, 0, array.length - 1);
}

function recursive(array: number[], target: number, start: number, end: number): number {
  if (start > end) {
    return -1;
  }

  const middleIndex = Math.floor((start + end) / 2);

  if (array[middleIndex] === target) {
    return middleIndex;
  }

  if (target < array[middleIndex]) {
    return recursive(array, target, start, middleIndex - 1);
  } else {
    return recursive(array, target, middleIndex + 1, end);
  }
}
