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
    it('예제 정도는 만족해야한다.', () => {
      expect(fn([1, 2, 1, 3, 1], [3, 1, 3, 4, 1]).toSorted()).toEqual([1, 3]);
      expect(fn([1, 1, 1], [1, 1, 1, 1, 1])).toEqual([1]);
      expect(fn([1, 2, 3], [4, 5, 6])).toEqual([]);
    });

    it('중복을 허용하면 안된다.', () => {
    });
  });

  describe('Edge cases', () => {
    it('서로 겹치는게 없는 경우에도 잘 동작해야한다.', () => {
    });

    it('둘중 하나이상이 빈배열일 경우 결과값도 빈배열이어야한다.', () => {
    });

    it('모든 요소가 겹치는 경우에도 잘 동작해야한다.', () => {
    });
  });
});
