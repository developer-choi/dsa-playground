import MinHeap from '@/data-structure/tree/binary/complete/heap/index';
import {range} from '@forworkchoe/core/utils';
import {iterativeIsHeap} from '@/data-structure/tree/binary/complete/heap/is-heap';

// yarn test src/data-structure/tree/binary/complete/heap/index.test.ts
describe('Heap', () => {
  describe('General cases', () => {
    it('should maintain the min-heap property after each insertion', () => {
      const heap = new MinHeap();
      range(60, 1).forEach(value => {
        heap.add(value);
        expect(iterativeIsHeap('min', heap.toArray().flat())).toBe(true);
      });
    });
  });
});
