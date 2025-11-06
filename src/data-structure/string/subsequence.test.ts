import {subsequenceUsingIterative} from '@/data-structure/string/subsequence';

// yarn test src/data-structure/string/subsequence.test.ts
describe('subsequenceUsingIterative()', () => {
  describe('General cases', () => {
    it('should return true if all characters of s1 are present in s2 in the same order', () => {
      expect(subsequenceUsingIterative('AXY', 'ADXCPY')).toBe(true);
    });

    it('should return false if all characters are present but not in the same order', () => {
      expect(subsequenceUsingIterative('AXY', 'YADXCP')).toBe(false);
    });
  });

  describe('Boundary cases', () => {
    it('should return true when the sequence is an empty string', () => {
      expect(subsequenceUsingIterative('', 'ADXCPY')).toBe(true);
    });

    it('should return false when the original string is empty and the sequence is not', () => {
      expect(subsequenceUsingIterative('AXY', '')).toBe(false);
    });

    it('should return true when both the original string and the sequence are empty strings', () => {
      expect(subsequenceUsingIterative('', '')).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should return true for identical strings', () => {
      expect(subsequenceUsingIterative('ABC', 'ABC')).toBe(true);
    });

    it('should return false if the sequence is longer than the original string', () => {
      expect(subsequenceUsingIterative('ABC', 'AB')).toBe(false);
    });
  });
});
