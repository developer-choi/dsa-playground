import {heapScoville} from '@/coding-test/heap/scoville';

// yarn test src/coding-test/heap/scoville.test.ts
describe('hwapScoville()', () => {
  describe('General cases', () => {
    it('should return 2 for the example case', () => {
      expect(heapScoville([1, 2, 3, 9, 10, 12], 7)).toBe(2);
    });
  });

  describe('Boundary cases', () => {
    it('should return 0 when the scoville array is empty', () => {
      expect(heapScoville([], 2)).toBe(0);
    });
  });

  describe('Edge cases', () => {
    it('should return 1 when one item is less than k and one is greater than k', () => {
      expect(heapScoville([3, 1], 2)).toBe(1);
    });

    describe('when it is impossible to make all values >= k', () => {
      it('should return -1 for an array of length 2', () => {
        expect(heapScoville([3, 4], 100)).toBe(-1);
      });
      it('should return -1 for an array of length 1', () => {
        expect(heapScoville([3], 100)).toBe(-1);
      });
    });

    describe('when no mixing is needed (all values >= k)', () => {
      it('should return 0 for an array of length 2', () => {
        expect(heapScoville([3, 4], 0)).toBe(0);
      });
      it('should return 0 for an array of length 1', () => {
        expect(heapScoville([3], 0)).toBe(0);
      });
    });
  });
});
