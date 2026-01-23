import {maximumSizeKUsingSlidingWindow} from '@/algorithm/sub-array/maximum-size-k';

const algorithms = [
  {name: 'Sliding Window', fn: maximumSizeKUsingSlidingWindow},
];

// yarn test src/algorithm/sub-array/maximum-size-k.test.ts
describe.each(algorithms)('Maximum sum of subarray of size k > $name', ({fn}) => {
  describe('General cases', () => {
    test('returns 700 for [100, 200, 300, 400] with k=2', () => {
      expect(fn([100, 200, 300, 400], 2)).toBe(700);
    });

    test('returns 39 for [1, 4, 2, 10, 23, 3, 1, 0, 20] with k=4', () => {
      expect(fn([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)).toBe(39);
    });

    test('returns 3 for [2, 3] with k=1', () => {
      expect(fn([2, 3], 1)).toBe(3);
    });
  });

  describe('Boundary cases', () => {
  });

  describe('Edge cases', () => {
  });
});