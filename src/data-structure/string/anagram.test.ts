import {anagramUsingHashmap} from './anagram';

// yarn test src/data-structure/string/anagram.test.ts
describe('anagramUsingHashmap()', () => {
  describe('General cases', () => {
    it('should return true for two strings that are anagrams', () => {
      expect(anagramUsingHashmap('geeks', 'kseeg')).toBe(true);
    });

    it('should return false when the second string has an extra character', () => {
      expect(anagramUsingHashmap('allergy', 'allergyy')).toBe(false);
    });

    it('should return false when characters in the two strings are not the same', () => {
      expect(anagramUsingHashmap('listen', 'lists')).toBe(false);
    });
  });

  describe('Boundary cases', () => {
    it('should return false if only one of the two strings is empty', () => {
      expect(anagramUsingHashmap('', 'a')).toBe(false);
      expect(anagramUsingHashmap('a', '')).toBe(false);
    });

    it('should return true if both strings are empty', () => {
      expect(anagramUsingHashmap('', '')).toBe(true);
    });
  });

  describe('Edge cases', () => {
  });
});
