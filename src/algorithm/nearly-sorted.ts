import {MinHeap} from '@/data-structure/tree/binary/complete/heap';

/**
 * URL: https://www.geeksforgeeks.org/dsa/nearly-sorted-algorithm/
 * Doc: https://docs.google.com/document/d/1dUt9mYfzFzZBdQBK-qvHiyi2_6nEScqxEQd0IdvJs8c/edit?tab=t.0
 */
export function nearlySorted(array: number[], nearlyDistance: number): number[] {
  if (array.length + 1 < nearlyDistance) {
    throw new TypeError('array.length가 nearlyDistance 대비 작습니다.');
  }

  const heap = new MinHeap();
  const result: number[] = [];

  for (const data of array) {
    if (heap.length < nearlyDistance + 1) {
      heap.add(data);
    } else {
      result.push(heap.extractRoot() as number);
      heap.add(data);
    }
  }

  const iteratingCount = heap.length;

  for (let i = 0 ; i < iteratingCount ; i++) {
    result.push(heap.extractRoot() as number);
  }

  return result;
}
