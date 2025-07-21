import {
  bruteForceSetIntersection,
  bruteForceTripleLoopIntersection,
  twoSetsIntersection
} from '@/examples/data-structure/set/intersection';

const algorithms = [
  {name: 'Triple Loop', fn: bruteForceTripleLoopIntersection},
  {name: 'Nested Loop + Set', fn: bruteForceSetIntersection},
  {name: 'Two Sets', fn: twoSetsIntersection},
];

// yarn test src/examples/data-structure/set/intersection.test.ts
describe.each(algorithms)('Intersection Algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    it('should return the correct intersection for a basic case', () => {
      expect(fn([1, 2, 1, 3, 1], [3, 1, 3, 4, 1]).toSorted()).toEqual([1, 3]);
      expect(fn([1, 1, 1], [1, 1, 1, 1, 1])).toEqual([1]);
      expect(fn([1, 2, 3], [4, 5, 6])).toEqual([]);
    });

    it('should return a set of unique elements, even with duplicate inputs', () => {
      expect(fn([1, 2, 2, 3, 3, 3], [2, 3, 3, 4]).toSorted()).toEqual([2, 3]);
    });
  });

  describe('Edge cases', () => {
    it('should return an empty array for disjoint sets', () => {
      expect(fn([1, 2, 3], [4, 5, 6]).toSorted()).toEqual([]);
    });

    it('should return an empty array if one or both inputs are empty', () => {
      expect(fn([1, 2, 3], []).toSorted()).toEqual([]);
      expect(fn([], [4, 5, 6]).toSorted()).toEqual([]);
      expect(fn([], []).toSorted()).toEqual([]);
    });

    it('should work correctly when all elements overlap', () => {
      expect(fn([1, 2, 3], [3, 1, 2]).toSorted()).toEqual([1, 2, 3]);
    });
  });
});
