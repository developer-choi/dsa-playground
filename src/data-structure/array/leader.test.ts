import {
  leadersInArrayUsingBruteForce,
  leadersInArrayUsingHeap,
  leadersInArrayUsingReverseTraverse
} from '@/data-structure/array/leader';

const algorithms = [
  {name: 'Brute Force', fn: leadersInArrayUsingBruteForce},
  {name: 'Max Heap', fn: leadersInArrayUsingHeap},
  {name: 'Reverse traverse', fn: leadersInArrayUsingReverseTraverse},
];

// yarn test src/data-structure/array/leader.test.ts
describe.each(algorithms)('Leaders in an array Algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    it('예제는 만족해야한다', () => {
      expect(fn([16, 17, 4, 3, 5, 2])).toEqual([17, 5, 2]);
      expect(fn([1, 2, 3, 4, 5, 2])).toEqual([5, 2]);
    });
  });

  describe('Boundary cases', () => {
  });

  describe('Edge cases', () => {
  });
});
