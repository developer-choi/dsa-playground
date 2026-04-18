import { stack } from './pg-12909';

const solutions = [
  { name: 'stack', fn: stack },
];

describe.each(solutions)('올바른 괄호 > $name', ({ fn }) => {
  describe('General cases', () => {
    it('짝이 맞는 단순 나열이면 true를 반환한다', () => {
      expect(fn('()()')).toBe(true);
    });
    it('중첩과 나열이 섞여도 짝이 맞으면 true를 반환한다', () => {
      expect(fn('(())()')).toBe(true);
    });
    it('닫힌 괄호가 먼저 나오면 false를 반환한다', () => {
      expect(fn(')()(')).toBe(false);
    });
    it('열린 괄호가 닫히지 않고 남으면 false를 반환한다', () => {
      expect(fn('(()(')).toBe(false);
    });
  });

  describe('Boundary cases', () => {
    it('괄호 사이에 다른 문자가 있어도 짝이 맞으면 true를 반환한다', () => {
      expect(fn('(a)(b)')).toBe(true);
    });
    it('중첩된 괄호 사이에 다른 문자가 있어도 짝이 맞으면 true를 반환한다', () => {
      expect(fn('(a(b)c)(d)')).toBe(true);
    });
    it('괄호 사이에 다른 문자가 있어도 닫힌 괄호가 먼저 나오면 false를 반환한다', () => {
      expect(fn(')a(b)c(')).toBe(false);
    });
    it('괄호 사이에 다른 문자가 있어도 열린 괄호가 남으면 false를 반환한다', () => {
      expect(fn('(a(b)c(')).toBe(false);
    });
    it('단일 열린 괄호면 false를 반환한다', () => {
      expect(fn('(')).toBe(false);
    });
    it('단일 닫힌 괄호면 false를 반환한다', () => {
      expect(fn(')')).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('빈 문자열이면 true를 반환한다', () => {
      expect(fn('')).toBe(true);
    });
  });
});
