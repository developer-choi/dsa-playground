import {MinHeap} from '@/data-structure/tree/binary/complete/heap';

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-k-numbers-occurrences-given-array/
 * Doc: https://docs.google.com/document/d/1vQsTFDtYka9TDtqLnOa9f8duk5HQqOtH_IdA2UtisH8/edit?tab=t.0
 * Time Complexity: O(n + c + d + d * log d) 인데 n이 c보다 보통 크니까 무시하면 O(n + d * log d)
 * - 여기서 말하는 d는 distinct, sort 하는건 유일한 숫자들만 정렬하기 때문에 n * log n이 아님.
 */
export function getMostFrequentElementsUsingSort(array: number[], count: number): number[] {
  validateParameters(array, count);

  // O(n)
  const map = toHashmap(array);

  /**
   * [...map] 에서 O(d)
   * .sort() 에서 O(d * log d)
   */
  const sorted = [...map].sort((a, b) => {
    const diffCount = b[1] - a[1];

    if (diffCount !== 0) {
      return diffCount;
    }

    return b[0] - a[0];
  });

  /**
   * slice() 에서 O(c)
   * map() 에서 O(c)
   */
  return sorted.slice(0, count).map(item => item[0]);
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-k-numbers-occurrences-given-array/#approach-2-using-max-heap
 * Doc: https://docs.google.com/document/d/1vQsTFDtYka9TDtqLnOa9f8duk5HQqOtH_IdA2UtisH8/edit?tab=t.0
 * Time Complexity: O(n + d * log c + c * log c) 인데 d가 c보다 보통 크니까, O(n + d * log c)
 * - 여기서 말하는 d는 distinct
 */
export function getMostFrequentElementsUsingHeap(array: number[], count: number): number[] {
  validateParameters(array, count);

  // O(n)
  const map = toHashmap(array);
  const heap = new MinHeap<{value: number, count: number}>((a, b) => {
    const diff = a.count - b.count;

    if (diff !== 0) {
      return diff;
    }

    return a.value - b.value;
  });

  // O(d)
  for (const [distinctValue, distinctCount] of map) {
    // O(log c)
    heap.add({value: distinctValue, count: distinctCount});

    if (heap.length > count) {
      // O(log c)
      heap.extractRoot();
    }
  }

  const result: number[] = new Array(heap.length);

  // O(c)
  for (let i = heap.length - 1; i >= 0 ; i--) {
    // O(log c)
    result[i] = heap.extractRoot()?.value as number;
  }

  return result;
}

/**
 * @return Map (key = distinct value / value = count)
 * Time Complexity: O(n)
 */
function toHashmap(array: number[]): Map<number, number> {
  const map = new Map<number, number>();

  for (const data of array) { // O(n)
    const count = map.get(data); // O(1)

    if (count === undefined) {
      map.set(data, 1); // O(1)

    } else {
      map.set(data, count + 1); // O(1)
    }
  }

  return map;
}

function validateParameters(array: number[], count: number) {
  if (array.length < count) {
    throw new TypeError('count parameter는 array.length보다 클 수 없습니다.');
  }
}
