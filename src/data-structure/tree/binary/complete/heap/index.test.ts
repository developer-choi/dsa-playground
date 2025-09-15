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

    it('should correctly decrease a key and restore the heap property', () => {
      const heap = new MinHeap();
      heap.add(10);
      heap.add(15);
      heap.add(20);
      heap.add(30);
      heap.add(40);
      heap.decreaseKey(3, 5);
      expect([...heap].map(item => item.data)).toEqual([5, 10, 20, 15, 40]);
    });

    it('should return sorted values when extractMin is called repeatedly', () => {
      const heap = new MinHeap();
      heap.add(2);
      heap.add(3);
      heap.add(10);
      heap.add(4);
      heap.add(5);
      expect(heap.extractMin()).toBe(2);
      expect([...heap].map(item => item.data)).toEqual([3, 4, 10, 5]);
      expect(heap.extractMin()).toBe(3);
      expect([...heap].map(item => item.data)).toEqual([4, 5, 10]);
      expect(heap.extractMin()).toBe(4);
      expect([...heap].map(item => item.data)).toEqual([5, 10]);
      expect(heap.extractMin()).toBe(5);
      expect([...heap].map(item => item.data)).toEqual([10]);
      expect(heap.extractMin()).toBe(10);
      expect([...heap].map(item => item.data)).toEqual([]);
      expect(heap.extractMin()).toBe(undefined);
      expect([...heap].map(item => item.data)).toEqual([]);
    });
  });

  describe('Edge cases', () => {
    it('should throw an error when trying to increase a key with decreaseKey', () => {
      const heap = new MinHeap();
      heap.add(10);
      expect(() => heap.decreaseKey(0, 30)).toThrow(TypeError);
    });

    it('should not change the position if the new value is still greater than its parent', () => {
      const heap = new MinHeap();
      heap.add(10);
      heap.add(20);
      heap.add(30);
      heap.decreaseKey(1, 15);
      expect([...heap].map(item => item.data)).toEqual([10, 15, 30]);
    });
  });
});
