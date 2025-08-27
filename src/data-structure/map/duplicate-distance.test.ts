import {bruteForceDuplicateDistance, hashDuplicateDistance} from '@/data-structure/map/duplicate-distance';

const algorithms = [
  {name: 'Brute Force', fn: bruteForceDuplicateDistance},
  {name: 'Map', fn: hashDuplicateDistance},
];

// yarn test src/data-structure/map/duplicate-distance.test.ts
describe.each(algorithms)('Duplicate Distance > $name', ({fn}) => {
  describe('General cases', () => {
    it('should pass the example cases from the problem description', () => {
      expect(fn(3, [1, 2, 3, 4, 1, 2, 3, 4])).toBe(false);
      expect(fn(3, [1, 2, 3, 1, 4, 5])).toBe(true);
      expect(fn(3, [1, 2, 3, 4, 5])).toBe(false);
    });

    it('should return true for consecutive duplicates', () => {
      expect(fn(1, [1, 1, 2, 3])).toBe(true);
      expect(fn(2, [1, 2, 3, 3])).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should return false when k is 0', () => {
      expect(fn(0, [1, 1])).toBe(false);
    });

    it('should return false for arrays with insufficient elements', () => {
      expect(fn(3, [1])).toBe(false);
      expect(fn(3, [])).toBe(false);
    });
  });
});