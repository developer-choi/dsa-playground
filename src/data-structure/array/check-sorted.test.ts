import {checkArrayIsSortedUsingIterative, checkArrayIsSortedUsingRecursive} from '@/data-structure/array/check-sorted';

const algorithms = [
  {name: 'Iterative', fn: checkArrayIsSortedUsingIterative},
  {name: 'Recursive', fn: checkArrayIsSortedUsingRecursive},
];

// yarn test src/data-structure/array/check-sorted.test.ts
describe.each(algorithms)('Check array is sorted > $name', ({fn}) => {
  describe('General cases', () => {
    it('should correctly identify an ascending sorted array', () => {
      expect(fn({value: [1, 2, 3, 4, 5], order: 'asc'})).toBe(true);
      expect(fn({value: [90, 80, 100, 70, 40, 30], order: 'asc'})).toBe(false);
    });

    it('should correctly identify a descending sorted array', () => {
      expect(fn({value: [5, 4, 3, 2, 1], order: 'desc'})).toBe(true);
      expect(fn({value: [1, 5, 4, 3, 2], order: 'desc'})).toBe(false);
    });
  });

  describe('Boundary cases', () => {
    it('should return true if the array length is 1 or less', () => {
      expect(fn({value: [], order: 'asc'})).toBe(true);
      expect(fn({value: [1], order: 'asc'})).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should return true for a sorted array containing duplicate elements', () => {
      expect(fn({value: [1, 2, 2, 3], order: 'asc'})).toBe(true);
      expect(fn({value: [5, 4, 4, 1], order: 'desc'})).toBe(true);
    });

    it('should always return true for an array where all elements are identical', () => {
      expect(fn({value: [5, 5, 5, 5], order: 'asc'})).toBe(true);
      expect(fn({value: [5, 5, 5, 5], order: 'desc'})).toBe(true);
    });
  });
});
