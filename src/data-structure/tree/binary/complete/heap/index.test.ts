import {MaxHeap, MinHeap} from '@/data-structure/tree/binary/complete/heap/index';
import {range} from '@forworkchoe/core/utils';
import {iterativeIsHeap} from '@/data-structure/tree/binary/complete/heap/is-heap';

const implementations = [
  {
    HeapClass: MinHeap,
    name: 'MinHeap',
    type: 'min' as const,
  },
  {
    HeapClass: MaxHeap,
    name: 'MaxHeap',
    type: 'max' as const,
  },
];

// yarn test src/data-structure/tree/binary/complete/heap/index.test.ts
describe.each(implementations)('$name', ({HeapClass, type}) => {
  describe('General cases', () => {
    it('should maintain the heap property after each insertion', () => {
      const heap = new HeapClass();
      range(60, 1).forEach(value => {
        heap.add(value);
        expect(iterativeIsHeap(type, heap.toArray().flat())).toBe(true);
      });
    });

    it('should correctly update a key and restore the heap property', () => {
      const heap = new HeapClass();
      heap.add(10);
      heap.add(15);
      heap.add(20);
      heap.add(30);
      heap.add(40);

      if (heap instanceof MinHeap) {
        heap.decreaseKey(3, 5);
        expect([...heap].map(item => item.data)).toEqual([5, 10, 20, 15, 40]);
      } else {
        heap.increaseKey(1, 60);
        expect([...heap].map(item => item.data)).toEqual([60, 40, 15, 10, 20]);
      }
    });

    it('should return sorted values when the root is extracted repeatedly', () => {
      const heap = new HeapClass();
      heap.add(2);
      heap.add(3);
      heap.add(10);
      heap.add(4);
      heap.add(5);

      if (heap instanceof MinHeap) {
        const expecteds = [
          {root: 2, array: [3, 4, 10, 5]},
          {root: 3, array: [4, 5, 10]},
          {root: 4, array: [5, 10]},
          {root: 5, array: [10]},
          {root: 10, array: []},
          {root: undefined, array: []},
        ];
        expecteds.forEach(expected => {
          expect(heap.extractRoot()).toBe(expected.root);
          expect([...heap].map(item => item.data)).toEqual(expected.array);
        });
      } else {
        const expecteds = [
          {root: 10, array: [5, 4, 3, 2]},
          {root: 5, array: [4, 2, 3]},
          {root: 4, array: [3, 2]},
          {root: 3, array: [2]},
          {root: 2, array: []},
          {root: undefined, array: []},
        ];
        expecteds.forEach(expected => {
          expect(heap.extractRoot()).toBe(expected.root);
          expect([...heap].map(item => item.data)).toEqual(expected.array);
        });
      }
    });

    it('should correctly delete keys from various positions (root, middle, leaf)', () => {
      const heap = new HeapClass();
      heap.add(13);
      heap.add(16);
      heap.add(31);
      heap.add(41);
      heap.add(51);
      heap.add(100);

      if (heap instanceof MinHeap) {
        heap.deleteKey(0);
        expect([...heap].map(item => item.data)).toEqual([16, 41, 31, 100, 51]);
        heap.deleteKey(heap.length - 1);
        expect([...heap].map(item => item.data)).toEqual([16, 41, 31, 100]);
        heap.deleteKey(2);
        expect([...heap].map(item => item.data)).toEqual([16, 41, 100]);
      } else {
        heap.deleteKey(0);
        expect([...heap].map(item => item.data)).toEqual([51, 41, 16, 13, 31]);
        heap.deleteKey(heap.length - 1);
        expect([...heap].map(item => item.data)).toEqual([51, 41, 16, 13]);
        heap.deleteKey(2);
        expect([...heap].map(item => item.data)).toEqual([51, 41, 13]);
      }
    });
  });

  describe('Edge cases', () => {
    it('should throw an error on invalid key update', () => {
      const heap = new HeapClass();
      heap.add(10);
      if (heap instanceof MinHeap) {
        expect(() => heap.decreaseKey(0, 30)).toThrow(TypeError);
      } else {
        expect(() => heap.increaseKey(0, 5)).toThrow(TypeError);
      }
    });

    it('should not change position if the heap property is not violated', () => {
      const heap = new HeapClass();
      heap.add(10);
      heap.add(20);
      heap.add(30);

      if (heap instanceof MinHeap) {
        heap.decreaseKey(1, 15);
        expect([...heap].map(item => item.data)).toEqual([10, 15, 30]);
      } else {
        heap.increaseKey(1, 25);
        expect([...heap].map(item => item.data)).toEqual([30, 25, 20]);
      }
    });
  });
});
