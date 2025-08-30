import {testWithRandomCases} from '@/utils/extend/test/jest';
import {makeRandomString, range, shuffleArray} from '@forworkchoe/core/utils';
import {solution42577} from '@/coding-test/map/level2/42577';

// yarn test src/coding-test/map/level2/42577.test.ts
describe('solution42577()', () => {
  describe('General cases', () => {
    it('should return false when a prefix appears before the longer number', () => {
      expect(solution42577(['119', '97674223', '1195524421'])).toBe(false);
    });

    it('should return false when a prefix appears after the longer number', () => {
      expect(solution42577(['97674223', '1195524421', '119'])).toBe(false);
    });

    it('should return false for chained prefixes', () => {
      expect(solution42577(['12', '123', '1235', '567', '88'])).toBe(false);
    });

    it('should handle randomized cases correctly by finding an injected prefix', () => {
      testWithRandomCases({
        targetFunction: solution42577,
        generateCase: () => {
          const array = range(1, 50).map(() => makeRandomString('NUMBER', 20));
          const prefix = array[Math.floor(array.length / 2)].slice(0, 5);

          return {
            inputs: [shuffleArray(array.concat(prefix))] as const,
            expected: false,
          };
        },
      });
    });
  });

  describe('Edge cases', () => {
    it('should return true when no number is a prefix of another', () => {
      expect(solution42577(['123', '456', '789'])).toBe(true);
    });

    it('should return true for a list with a single number', () => {
      expect(solution42577(['1234567'])).toBe(true);
    });
  });
});
