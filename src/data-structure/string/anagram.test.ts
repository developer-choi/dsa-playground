import {anagramUsingHashmap} from './anagram';

// yarn test src/data-structure/string/anagram.test.ts
describe('anagramUsingHashmap()', () => {
  describe('General cases', () => {
    it('"geeks"와 "kseeg"와 같이 애너그램인 두 문자열에 대해서는 true를 반환해야 합니다.', () => {
      expect(anagramUsingHashmap('geeks', 'kseeg')).toBe(true);
    });

    it('"allergy"와 "allergyy"와 같이 두 번째 문자열에 추가 문자가 있는 경우 false를 반환해야 합니다.', () => {
      expect(anagramUsingHashmap('allergy', 'allergyy')).toBe(false);
    });

    it('"listen"과 "lists"와 같이 두 문자열의 문자가 같지 않은 경우 false를 반환해야 합니다.', () => {
      expect(anagramUsingHashmap('listen', 'lists')).toBe(false);
    });
  });

  describe('Boundary cases', () => {
    it('둘중 하나만 빈문자열인 경우 false가 반환되야합니다.', () => {
      expect(anagramUsingHashmap('', 'a')).toBe(false);
      expect(anagramUsingHashmap('a', '')).toBe(false);
    });

    it('둘 다 빈문자열인 경우 true를 반환해야합니다.', () => {
      expect(anagramUsingHashmap('', '')).toBe(true);
    });
  });

  describe('Edge cases', () => {
  });
});

