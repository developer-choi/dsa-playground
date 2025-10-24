import {MaxHeap} from '@/data-structure/tree/binary/complete/heap';

/**
 * URL: https://www.geeksforgeeks.org/dsa/leaders-in-an-array/
 * Doc: https://docs.google.com/document/d/1x11Iyb-uSmG4Jr30_8Cn2IMsXneM7y11zCaq0VmW4kA/edit?tab=t.0
 * Time Complexity: O(n^2)
 */
export function leadersInArrayUsingBruteForce(array: number[]): number[] {
  const result: number[] = [];

  for (let i = 0; i < array.length; i++) {
    let isLeader = true;

    for (let j = i + 1; j < array.length; j++) {
      if(array[i] <= array[j]) {
        isLeader = false;
        break;
      }
    }

    if (isLeader) {
      result.push(array[i]);
    }
  }

  return result;
}

// Time Complexity: O(n log n)
export function leadersInArrayUsingHeap(array: number[]): number[] {
  const maxHeap = new MaxHeap();
  const result = new Set<number>();

  for (let i = array.length - 1; i >= 0; i--) {
    const item = array[i];
    maxHeap.add(item);

    if (item === maxHeap.peek()) {
      result.add(item);
    }
  }

  return [...result].toReversed();
}
