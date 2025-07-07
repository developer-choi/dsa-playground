import parenthesesUsingStack from '@/examples/data-structure/stack/problems/parentheses';

// yarn test src/examples/data-structure/stack/problems/parentheses.test.ts
describe('parenthesesUsingStack()', () => {
  describe('General cases', () => {
    it('같아야함', () => {
      expect(parenthesesUsingStack('[{()}]')).toBeTruthy();
      expect(parenthesesUsingStack('[()()]{}')).toBeTruthy();
      expect(parenthesesUsingStack('([]')).toBeFalsy();
      expect(parenthesesUsingStack('([{]})')).toBeFalsy();
    });
  });

  describe('Edge cases', () => {
    it('괄호가 없어도 true', () => {
      expect(parenthesesUsingStack('abc')).toBeTruthy();
    });

    it('빈문자열이면 true', () => {
      expect(parenthesesUsingStack('')).toBeTruthy();
    });
  });
});
