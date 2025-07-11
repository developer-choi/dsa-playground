import parenthesesUsingStack from '@/examples/data-structure/stack/problems/parentheses';

// yarn test src/examples/data-structure/stack/problems/parentheses.test.ts
describe('parenthesesUsingStack()', () => {
  describe('General cases', () => {
    it('should return true for balanced expressions and false otherwise', () => {
      expect(parenthesesUsingStack('[{()}]')).toBeTruthy();
      expect(parenthesesUsingStack('[()()]{}')).toBeTruthy();
      expect(parenthesesUsingStack('([]')).toBeFalsy();
      expect(parenthesesUsingStack('([{]})')).toBeFalsy();
    });
  });

  describe('Edge cases', () => {
    it('should return true for strings with no brackets', () => {
      expect(parenthesesUsingStack('abc')).toBeTruthy();
    });

    it('should return true for an empty string', () => {
      expect(parenthesesUsingStack('')).toBeTruthy();
    });
  });
});