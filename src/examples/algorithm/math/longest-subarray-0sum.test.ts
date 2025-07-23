import {bestLongestSubarray0Sum, bruteForceLongestSubarray0Sum} from '@/examples/algorithm/math/longest-subarray-0sum';

const algorithms = [
  {name: 'Brute Force', fn: bruteForceLongestSubarray0Sum},
  {name: 'Best', fn: bestLongestSubarray0Sum},
];

// yarn test src/examples/algorithm/math/longest-subarray-0sum.test.ts
describe.each(algorithms)('Longest Subarray 0 Sum Algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    it('예제 정도는 만족해야한다.', () => {
      expect(fn([15, -2, 2, -8, 1, 7, 10])).toBe(5);
      expect(fn([1, 2, 3])).toBe(0);
      expect(fn([1, 0, 3])).toBe(1);
    });
  });

  describe('Edge cases', () => {
    it('빈배열이면 길이가 0이어야 한다.', () => {
      expect(fn([])).toBe(0);
    });
  });
});
