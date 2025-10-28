import {checkArrayIsSortedUsingIterative, checkArrayIsSortedUsingRecursive} from '@/data-structure/array/check-sorted';

const algorithms = [
  {name: 'Iterative', fn: checkArrayIsSortedUsingIterative},
  {name: 'Recursive', fn: checkArrayIsSortedUsingRecursive},
];

// yarn test src/data-structure/array/check-sorted.test.ts
describe.each(algorithms)('Check array is sorted > $name', ({fn}) => {
  describe('General cases', () => {
    it('예제는 만족해야한다', () => {
      expect(fn({value: [1, 2, 3, 4, 5], order: 'asc'})).toBe(true);
      expect(fn({value: [90, 80, 100, 70, 40, 30], order: 'asc'})).toBe(false);
    });
  });

  describe('Boundary cases', () => {
    it('배열의 길이가 1 이하이면 true를 반환해야한다.', () => {
      expect(fn({value: [], order: 'asc'})).toBe(true);
      expect(fn({value: [1], order: 'asc'})).toBe(true);
    });
  });

  describe('Edge cases', () => {
  });
});
