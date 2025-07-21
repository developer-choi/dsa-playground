import {bruteForceDuplicateDistance, hashDuplicateDistance} from '@/examples/data-structure/map/duplicate-distance';

const algorithms = [
  {name: 'Brute Force', fn: bruteForceDuplicateDistance},
  {name: 'Map', fn: hashDuplicateDistance},
];

// yarn test src/examples/data-structure/map/duplicate-distance.test.ts
describe.each(algorithms)('Duplicate Distance > $name', ({fn}) => {
  describe('General cases', () => {
    it('should pass the example cases from the problem description', () => {
      expect(fn(3, [1, 2, 3, 4, 1, 2, 3, 4])).toBeFalsy();
      expect(fn(3, [1, 2, 3, 1, 4, 5])).toBeTruthy();
      expect(fn(3, [1, 2, 3, 4, 5])).toBeFalsy();
    });

    it('should return true for consecutive duplicates', () => {
      expect(fn(1, [1, 1, 2, 3])).toBeTruthy();
      expect(fn(2, [1, 2, 3, 3])).toBeTruthy();
    });
  });

  describe('Edge cases', () => {
    it('should return false when k is 0', () => {
      expect(fn(0, [1, 1])).toBeFalsy();
    });

    it('should return false for arrays with insufficient elements', () => {
      expect(fn(3, [1])).toBeFalsy();
      expect(fn(3, [])).toBeFalsy();
    });
  });
});