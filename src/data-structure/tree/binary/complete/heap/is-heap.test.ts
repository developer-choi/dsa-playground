import {iterativeIsMaxHeap} from '@/data-structure/tree/binary/complete/heap/is-heap';

// yarn test src/data-structure/tree/binary/complete/heap/is-heap.test.ts
describe('isMaxHeap()', () => {
  describe('General cases', () => {
    it('should correctly identify valid max-heaps', () => {
      expect(iterativeIsMaxHeap([90, 15, 10, 7, 12, 2, 7, 3])).toBe(true);
    });

    it('should return false if the root node violates the heap property', () => {
      expect(iterativeIsMaxHeap([90, 1, 2, 7, 12, 2, 7, 3])).toBe(false);
    });

    it('should return false when an intermediate node violates the heap property', () => {
      expect(iterativeIsMaxHeap([90, 15, 10, 7, 20, 2, 7, 3])).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('should return true for a single-node array', () => {
      expect(iterativeIsMaxHeap([100])).toBe(true);
    });

    it('should return true for an empty array', () => {
      expect(iterativeIsMaxHeap([])).toBe(true);
    });
  });
});
