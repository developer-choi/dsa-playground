import unboundedBinarySearch from '@/algorithm/search/unbounded-binary';

// yarn test src/algorithm/search/unbounded-binary.test.ts
describe('unboundedBinarySearch()', () => {
  describe('General cases', () => {
    it('should find the first positive point in a general case', () => {
      const f = (x: number) => x - 100;
      expect(unboundedBinarySearch(f)).toBe(101);
    });

    it('should work for a slowly increasing function where values can be stagnant', () => {
      const f = (x: number) => Math.floor(x / 10) - 5;
      expect(unboundedBinarySearch(f)).toBe(60);
    });

    it('should handle large numbers correctly', () => {
      const f = (x: number) => x - 987654;
      expect(unboundedBinarySearch(f)).toBe(987655);
    });
  });

  describe('Boundary cases', () => {
    it('should find the answer when it is 1', () => {
      const f = (x: number) => x;
      expect(unboundedBinarySearch(f)).toBe(1);
    });

    it('should find the answer when it is 0', () => {
      const f = (x: number) => x + 1;
      expect(unboundedBinarySearch(f)).toBe(0);
    });

    it('should work correctly when the answer is right after a power of 2 boundary', () => {
      const f = (x: number) => x - 64;
      expect(unboundedBinarySearch(f)).toBe(65);
    });
  });
});
