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
      const expecteds = [
        {
          min: 2,
          array: [3, 4, 10, 5]
        },
        {
          min: 3,
          array: [4, 5, 10]
        },
        {
          min: 4,
          array: [5, 10]
        },
        {
          min: 5,
          array: [10]
        },
        {
          min: 10,
          array: []
        },
        {
          min: undefined,
          array: []
        },
      ];

      expecteds.forEach(expected => {
        expect(heap.extractMin()).toBe(expected.min);
        expect(heap.length).toBe(expected.array.length);
        expect([...heap].map(item => item.data)).toEqual(expected.array);
      });
    });

    it('should correctly delete keys from various positions (root, middle, leaf)', () => {
      const heap = new MinHeap();
      heap.add(13);
      heap.add(16);
      heap.add(31);
      heap.add(41);
      heap.add(51);
      heap.add(100);

      heap.deleteKey(0);
      expect([...heap].map(item => item.data)).toEqual([16, 41, 31, 100, 51]);
      heap.deleteKey(heap.length - 1);
      expect([...heap].map(item => item.data)).toEqual([16, 41, 31, 100]);
      heap.deleteKey(2);
      expect([...heap].map(item => item.data)).toEqual([16, 41, 100]);
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
