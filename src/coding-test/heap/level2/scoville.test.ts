import {myHeapScoville, otherHeapScoville} from '@/coding-test/heap/level2/scoville';

const algorithms = [
  {name: '나의 Heap 풀이', fn: myHeapScoville},
  {name: '타인 Heap 풀이', fn: otherHeapScoville},
];

// yarn test src/coding-test/heap/level2/scoville.test.ts
describe.each(algorithms)('Scoville Algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    it('should return 2 for the example case', () => {
      expect(fn([1, 2, 3, 9, 10, 12], 7)).toBe(2);
    });
  });

  describe('Boundary cases', () => {
    it('should return 0 when the scoville array is empty', () => {
      expect(fn([], 2)).toBe(0);
    });
  });

  describe('Edge cases', () => {
    it('should return 1 when one item is less than k and one is greater than k', () => {
      expect(fn([3, 1], 2)).toBe(1);
    });

    describe('when it is impossible to make all values >= k', () => {
      it('should return -1 for an array of length 2', () => {
        expect(fn([3, 4], 100)).toBe(-1);
      });
      it('should return -1 for an array of length 1', () => {
        expect(fn([3], 100)).toBe(-1);
      });
    });

    describe('when no mixing is needed (all values >= k)', () => {
      it('should return 0 for an array of length 2', () => {
        expect(fn([3, 4], 0)).toBe(0);
      });
      it('should return 0 for an array of length 1', () => {
        expect(fn([3], 0)).toBe(0);
      });
    });
  });
});
