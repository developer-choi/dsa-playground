import {iterativeIsHeap} from '@/data-structure/tree/binary/complete/heap/is-heap';

// yarn test src/data-structure/tree/binary/complete/heap/is-heap.test.ts
describe('iterativeIsHeap()', () => {
  describe('General cases', () => {
    const MAX_HEAP = [90, 15, 10, 7, 12, 2, 7, 3];
    const MIN_HEAP = [1, 2, 3, 4, 5, 6, 7];

    it('should correctly identify valid max-heaps', () => {
      expect(iterativeIsHeap('max', MAX_HEAP)).toBe(true);
    });

    it('should correctly identify valid min-heaps', () => {
      expect(iterativeIsHeap('min', MIN_HEAP)).toBe(true);
    });

    it('should return false if the root node violates the heap property', () => {
      expect(iterativeIsHeap('max', MIN_HEAP)).toBe(false);
      expect(iterativeIsHeap('min', MAX_HEAP)).toBe(false);
    });

    it('should return false when an intermediate node violates the heap property', () => {
      expect(iterativeIsHeap('max', [90, 15, 10, 7, 20, 2, 7, 3])).toBe(false);
      expect(iterativeIsHeap('min', [1, 2, 3, 4, 0, 6, 7])).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('should return true for a single-node array', () => {
      expect(iterativeIsHeap('max', [100])).toBe(true);
      expect(iterativeIsHeap('min', [100])).toBe(true);
    });

    it('should return true for an empty array', () => {
      expect(iterativeIsHeap('max', [])).toBe(true);
      expect(iterativeIsHeap('min', [])).toBe(true);
    });
  });
});
