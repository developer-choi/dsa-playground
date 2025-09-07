import {binaryTreeTargetSum} from '@/algorithm/target-sum';

// yarn test src/algorithm/target-sum.test.ts
describe('binaryTreeTargetSum()', () => {
  it('should return the correct number of ways for example cases', () => {
    expect(binaryTreeTargetSum([1, 1, 1, 1, 1], 3)).toBe(5);
    expect(binaryTreeTargetSum([1], 1)).toBe(1);
  });

  describe('Edge cases', () => {
    it('should return 0 when the target is unreachable', () => {
      expect(binaryTreeTargetSum([1, 2, 3], 10)).toBe(0);
    });

    it('should handle zeros correctly', () => {
      expect(binaryTreeTargetSum([1, 0, 0], 1)).toBe(4);
    });

    it('should return 1 for an empty array if target is 0', () => {
      expect(binaryTreeTargetSum([], 0)).toBe(1);
    });

    it('should return 0 for an empty array if target is not 0', () => {
      expect(binaryTreeTargetSum([], 5)).toBe(0);
    });
  });
});
