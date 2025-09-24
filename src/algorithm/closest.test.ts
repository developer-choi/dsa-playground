import {
  closestElementsUsingBinarySearchTwoPointers,
  closestElementsUsingLinearSearchTwoPointers,
  closestElementsUsingSort,
  myClosestElements
} from '@/algorithm/closest';

const algorithms = [
  {name: 'My Logic', fn: myClosestElements},
  {name: 'Using Sort', fn: closestElementsUsingSort},
  {name: 'Linear Search + Two Pointers', fn: closestElementsUsingLinearSearchTwoPointers},
  {name: 'Binary Search + Two Pointers', fn: closestElementsUsingBinarySearchTwoPointers},
];

// yarn test src/algorithm/closest.test.ts
describe.each(algorithms)('Closet elements algorithms > $name', ({fn}) => {
  describe('General cases', () => {
    it('should return the correct elements for the given examples', () => {
      expect(fn([12, 16, 22, 30, 35, 39, 42, 45, 48, 50, 53, 55, 56], 4, 35)).toEqual([39, 30, 42, 45]);
      expect(fn([1, 3, 4, 10, 12], 2, 4)).toEqual([3, 1]);
    });

    it('should prioritize the larger number when differences are tied', () => {
      expect(fn([1, 3, 5], 2, 3)).toEqual([5, 1]);
      expect(fn([5, 3, 1], 2, 3)).toEqual([5, 1]);
    });
  });

  describe('Boundary cases', () => {
    it('should work correctly when the target is the last element', () => {
      expect(fn([1, 2, 3, 4, 5], 3, 5)).toEqual([4, 3, 2]);
    });

    it('should work correctly when the target is the first element', () => {
      expect(fn([1, 2, 3, 4, 5], 3, 1)).toEqual([2, 3, 4]);
    });
  });
});
