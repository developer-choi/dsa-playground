import parenthesesUsingStack from '@/coding-test/stack/level2/parentheses';

// yarn test src/examples/data-structure/stack/problems/parentheses.test.ts
describe('parenthesesUsingStack()', () => {
  describe('General cases', () => {
    it('should return true for balanced expressions and false otherwise', () => {
      expect(parenthesesUsingStack('[{()}]')).toBe(true);
      expect(parenthesesUsingStack('[()()]{}')).toBe(true);
      expect(parenthesesUsingStack('([]')).toBe(false);
      expect(parenthesesUsingStack('([{]})')).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('should return true for strings with no brackets', () => {
      expect(parenthesesUsingStack('abc')).toBe(true);
    });

    it('should return true for an empty string', () => {
      expect(parenthesesUsingStack('')).toBe(true);
    });

    it('should return false if closing parentheses outnumber opening parentheses', () => {
      expect(parenthesesUsingStack(')')).toBe(false);
    });
  });
});