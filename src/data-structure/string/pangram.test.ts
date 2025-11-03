import {pangramUsingBruteForce, pangramUsingSet} from '@/data-structure/string/pangram';

const algorithms = [
  {name: 'Brute Force', fn: pangramUsingBruteForce},
  {name: 'Set', fn: pangramUsingSet},
];

// yarn test src/data-structure/string/pangram.test.ts
describe.each(algorithms)('Pangram Algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    it('문자 사이에 공백이나 dot등 다른 앒파벳이 있어도 만족해야한다.', () => {
      expect(fn('The quick brown fox jumps over the lazy dog.')).toBe(true);
    });

    it('a부터 z까지 문자중 일부가 없는 경우 false가 반환되야한다.', () => {
      expect(fn('The quick brown fox jumps over the dog')).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('대소문자 구분없이 체크되야한다.', () => {
      expect(fn('The quick Brown fox jumps over the lazy dog')).toBe(true);
    });
  });
});
