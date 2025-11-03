import {pangramUsingBruteForce, pangramUsingSet} from '@/data-structure/string/pangram';

const algorithms = [
  {name: 'Brute Force', fn: pangramUsingBruteForce},
  {name: 'Set', fn: pangramUsingSet},
];

// yarn test src/data-structure/string/pangram.test.ts
describe.each(algorithms)('Pangram Algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    it('should return true even if there are spaces or other non-alphabetic characters between letters.', () => {
      expect(fn('The quick brown fox jumps over the lazy dog.')).toBe(true);
    });

    it('should return false if some characters from a to z are missing.', () => {
      expect(fn('The quick brown fox jumps over the dog')).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('should be case-insensitive.', () => {
      expect(fn('The quick Brown fox jumps over the lazy dog')).toBe(true);
    });
  });
});
