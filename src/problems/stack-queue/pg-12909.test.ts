import { stack } from './pg-12909';
import { compareFunctionsWithRandomInputs } from '@/utils/jest';

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

  describe('Random', () => {
    test('랜덤 입력으로 정답과 동일한지 검증한다', () => {
      compareFunctionsWithRandomInputs({
        targetFunction: fn,
        answerFunction: (text: string) => {
          let count = 0;
          for (const c of text) {
            if (c === '(') count++;
            else if (c === ')') {
              count--;
              if (count < 0) return false;
            }
          }
          return count === 0;
        },
        generateInput: () => {
          const length = Math.floor(Math.random() * 30) + 1;
          const chars = '()abc';
          const text = Array.from({length}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
          return [text] as [string];
        },
        iterationCount: 1000,
      });
    });
  });
});
