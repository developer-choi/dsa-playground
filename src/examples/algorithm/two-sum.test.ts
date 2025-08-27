import {
  bruteForceTwoSum,
  setArrayTwoSum,
  setBSTTwoSum,
  twoPointersArrayTwoSum,
  twoPointersBSTTwoSum
} from '@/examples/algorithm/two-sum';
import {recursiveArrayToBalancedTree} from '@/examples/data-structure/tree/binary/array-to-balanced-tree';
import {sortByNumber} from '@forworkchoe/core/utils';

const algorithms = [
  {type: 'Unsorted Array', algorithm: 'Brute Force', fn: bruteForceTwoSum},
  {type: 'Unsorted Array', algorithm: 'Two Pointers', fn: twoPointersArrayTwoSum},
  {type: 'BST', algorithm: 'Two Pointers', fn: twoPointersBSTTwoSum},
  {type: 'Unsorted Array', algorithm: 'Set', fn: setArrayTwoSum},
  {type: 'BST', algorithm: 'Set', fn: setBSTTwoSum},
] as const;

// yarn test src/examples/algorithm/two-sum.test.ts
describe.each(algorithms)('Two Sum > $algorithm ($type)', ({fn, type}) => {
  const testCases = [
    {
      description: 'should return true when a pair exists',
      array: [5, 2, 6, 7],
      target: 12,
      expected: true,
    },
    {
      description: 'should return false when no pair exists',
      array: [1, -2, 1, 0, 5],
      target: 0,
      expected: false,
    },
    {
      description: 'should return false for a single-element',
      array: [1],
      target: 1,
      expected: false,
    },
    {
      description: 'should return false for an empty array',
      array: [],
      target: 0,
      expected: false,
    }
  ];

  test.each(testCases)('$description (array: $array, target: $target)', ({array, target, expected}) => {
    if (type === 'Unsorted Array') {
      expect(fn(array, target)).toBe(expected);
    } else {
      const root = recursiveArrayToBalancedTree(sortByNumber('asc', array, value => value));
      expect(fn(root, target)).toBe(expected);
    }
  });
});
