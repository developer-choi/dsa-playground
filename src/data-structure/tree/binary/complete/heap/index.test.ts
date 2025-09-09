import MinHeap from '@/data-structure/tree/binary/complete/heap/index';
import {range} from '@forworkchoe/core/utils';

// yarn test src/data-structure/tree/binary/complete/heap/index.test.ts
describe('Heap', () => {
  describe('General cases', () => {
    it('should maintain the min-heap property after each insertion', () => {
      const heap = new MinHeap();
      range(60, 1).forEach(value => {
        heap.add(value);
        expect(officialIsMinHeap(heap.toArray().flat())).toBe(true);
      });
    });
  });
});

/*************************************************************************************************************
 * Official
 *************************************************************************************************************/
// https://www.geeksforgeeks.org/dsa/how-to-check-if-a-given-array-represents-a-binary-heap/
function officialIsMinHeap(arr: number[]): boolean {
  const n = arr.length;

  for (let i = 0; i <= Math.floor((n - 2) / 2); i++) {
    if (arr[2 * i + 1] < arr[i]) {
      return false;
    }
    if (2 * i + 2 < n && arr[2 * i + 2] < arr[i]) {
      return false;
    }
  }
  return true;
}
