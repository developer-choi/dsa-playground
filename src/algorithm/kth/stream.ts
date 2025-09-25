import {Heap, MaxHeap, MinHeap} from '@/data-structure/tree/binary/complete/heap';

/**
 * URL: https://www.geeksforgeeks.org/dsa/kth-largest-element-in-a-stream/
 * Doc: https://docs.google.com/document/d/1dUt9mYfzFzZBdQBK-qvHiyi2_6nEScqxEQd0IdvJs8c/edit?tab=t.0
 * Time Complexity: O(n * log o)
 */
export function findKthElementInStream(array: number[], order: number, type: 'smallest' | 'largest'): (number | -1)[] {
  if (array.length < order) {
    throw new TypeError('array.length 보다 order parameter값이 더 클 수 없습니다.');
  }

  const heap = new HEAP_CLASSES[type]();
  const result: number[] = [];

  for (const data of array) { // O(n)
    heap.add(data); // O(log o)

    if (heap.length === order) {
      result.push(heap.peek() as number); // O(log o)

    } else if (heap.length > order) {
      heap.extractRoot(); // O(log o)
      result.push(heap.peek() as number); // O(log o)

    } else {
      result.push(-1);
    }
  }

  return result;
}

const HEAP_CLASSES: Record<'smallest' | 'largest', new () => Heap> = {
  smallest: MaxHeap,
  largest: MinHeap
};
