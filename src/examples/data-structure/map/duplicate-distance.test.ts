import {bruteForceDuplicateDistance, hashDuplicateDistance} from '@/examples/data-structure/map/duplicate-distance';

const algorithms = [
  {name: 'Brute Force', fn: bruteForceDuplicateDistance},
  {name: 'Map', fn: hashDuplicateDistance},
];

// yarn test src/examples/data-structure/map/duplicate-distance.test.ts
describe.each(algorithms)('Duplicate Distance > $name', ({fn}) => {
  describe('General cases', () => {
    it('적어도 예제는 만족해야한다.', () => {
      expect(fn(3, [1, 2, 3, 4, 1, 2, 3, 4])).toBeFalsy();
      expect(fn(3, [1, 2, 3, 1, 4, 5])).toBeTruthy();
      expect(fn(3, [1, 2, 3, 4, 5])).toBeFalsy();
    });
  });
});
