import {iterativeIsMaxHeap} from '@/data-structure/tree/binary/complete/heap/is-heap';

// yarn test src/data-structure/tree/binary/complete/heap/is-heap.test.ts
describe('isMaxHeap()', () => {
  it('should correctly identify valid and invalid max-heaps', () => {
    expect(iterativeIsMaxHeap([90, 15, 10, 7, 12, 2, 7, 3])).toBe(true);
  });

  it('should return false if the root node violates the heap property', () => {
    expect(iterativeIsMaxHeap([90, 1, 2, 7, 12, 2, 7, 3])).toBe(false);
  });

  it('should return true for an empty array', () => {
    expect(iterativeIsMaxHeap([])).toBe(true);
  });
});
