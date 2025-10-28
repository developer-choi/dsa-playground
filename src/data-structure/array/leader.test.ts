import {
  leadersInArrayUsingBruteForce,
  leadersInArrayUsingHeap,
} from '@/data-structure/array/leader';

const algorithms = [
  {name: 'Brute Force', fn: leadersInArrayUsingBruteForce},
  {name: 'Max Heap', fn: leadersInArrayUsingHeap},
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
    it('배열 요소가 1개인 경우 그걸 그대로 반환해야한다.', () => {
      const value = 1;
      expect(fn([value])).toEqual([value]);
    });

    it('빈 배열인 경우, 빈 배열을 반황해야한다.', () => {
      expect(fn([])).toEqual([]);
    });
  });

  describe('Edge cases', () => {
    it('배열 요소가 모두 같은 값인 경우 하나만 반환해야한다.', () => {
      const value = 2;
      expect(fn([value, value, value])).toEqual([value]);
    });
  });
});
