import { getAccumulatedServerIncreasementCount } from './server-expansion';

// yarn test src/coding-test/array/server-expansion.test.ts
describe('getAccumulatedServerIncreasementCount()', () => {
  describe('General cases', () => {
    it('should return 7 when m=3, k=5 for the given player counts', () => {
      expect(getAccumulatedServerIncreasementCount([0, 2, 3, 3, 1, 2, 0, 0, 0, 0, 4, 2, 0, 6, 0, 4, 2, 13, 3, 5, 10, 0, 1, 5], 3, 5)).toBe(7);
    });

    it('should return 11 when m=5, k=1 for the given player counts', () => {
      expect(getAccumulatedServerIncreasementCount([0, 0, 0, 10, 0, 12, 0, 15, 0, 1, 0, 1, 0, 0, 0, 5, 0, 0, 11, 0, 8, 0, 0, 0], 5, 1)).toBe(11);
    });

    it('should return 12 when m=1, k=1 for the given player counts', () => {
      expect(getAccumulatedServerIncreasementCount([0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], 1, 1)).toBe(12);
    });
  });

  describe('Boundary cases', () => {
  });

  describe('Edge cases', () => {
  });
});
