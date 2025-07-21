import {bruteForceTwoSum, hashTwoSum, twoPointersTwoSum} from '@/examples/data-structure/set/two-sum';

const algorithms = [
  {name: 'Brute Force', fn: bruteForceTwoSum},
  {name: 'Two Pointers', fn: twoPointersTwoSum},
  {name: 'Set', fn: hashTwoSum},
];

// yarn test src/examples/data-structure/set/two-sum.test.ts
describe.each(algorithms)('Two Sum > $name', ({fn}) => {
  describe('General cases', () => {
    it('적어도 예제는 만족해야함', () => {
      expect(fn([0, -1, 2, -3, 1], -2)).toBeTruthy();
      expect(fn([1, -2, 1, 0, 5], 0)).toBeFalsy();
    });
  });

  describe('Edge cases', () => {
    it('배열 갯수가 1개여도 잘 동작해야함.', () => {
      expect(fn([1], 1)).toBeFalsy();
    });
    it('빈배열이어도 잘 동작해야함.', () => {
      expect(fn([], 0)).toBeFalsy();
    });
  });
});
