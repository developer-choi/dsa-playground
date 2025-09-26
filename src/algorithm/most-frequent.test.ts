import {getMostFrequentElementsUsingMap} from '@/algorithm/most-frequent';
import {range} from '@forworkchoe/core/utils';

const algorithms = [
  {name: 'Hashmap & Sorting', fn: getMostFrequentElementsUsingMap},
];

// yarn test src/algorithm/most-frequent.test.ts
describe.each(algorithms)('Most Frequent Algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    it('내림차순으로 정렬되야한다. 횟수가 동일하다면 큰값을 우선해야한다.', () => {
      const original = range(1, 4);
      expect(fn([...original, ...original], original.length)).toEqual(original.toReversed());
    });

    it('많이 빈번 한 순서대로 나열되야한다.', () => {
      expect(fn([1, 2, 2, 3, 3, 3, 4, 4, 4, 4], 4)).toEqual([4, 3, 2, 1]);
    });
  });

  describe('Boundary cases', () => {
    it('빈배열인 경우 빈배열이 응답되야 한다', () => {
      expect(fn([], 0)).toEqual([]);
    });
  });

  describe('Edge cases', () => {
    it('배열의 길이보다 count가 크다면 에러가 던져져야 한다.', () => {
      const array = [1, 2];
      expect(() => fn(array, array.length + 2)).toThrow(TypeError);
    });
  });
});
