import {bruteForceMostFrequent, mapMostFrequent} from '@/examples/data-structure/map/most-frequent';

const algorithms = [
  {name: 'Brute Force', fn: bruteForceMostFrequent},
  {name: 'Map', fn: mapMostFrequent},
];

// yarn test src/examples/data-structure/map/most-frequent.test.ts
describe.each(algorithms)('Duplicate Distance > $name', ({fn}) => {
  describe('General cases', () => {
    it('예제 정도는 만족해야한다.', () => {
      expect(fn([1, 3, 2, 1, 4, 1])).toBe(1);
      expect(fn([10, 20, 10, 20, 30, 20, 20])).toBe(20);
      expect(fn([1, 2, 2, 4, 1])).toBe(2);
    });
  });

  describe('Edge cases', () => {
    it('빈배열이면 undefined가 반환되야한다.', () => {
      expect(fn([])).toBeUndefined();
    });
  });
});
