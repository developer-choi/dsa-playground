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

    it('예제는 만족해야한다', () => {
      const heap = new MinHeap();
      heap.add(10);
      heap.add(15);
      heap.add(20);
      heap.add(30);
      heap.add(40);
      heap.decreaseKey(3, 5);
      expect([...heap].map(item => item.data)).toEqual([5, 10, 20, 15, 40]);
    });
  });
});
