import {subsequenceUsingIterative} from '@/data-structure/string/subsequence';

// yarn test src/data-structure/string/subsequence.test.ts
describe('subsequenceUsingIterative()', () => {
  describe('General cases', () => {
    it('s1의 모든 문자가 s2에 같은 순서로 있으면 true를 반환해야 합니다.', () => {
      expect(subsequenceUsingIterative('AXY', 'ADXCPY')).toBe(true);
    });

    it('모든 문자가 존재하지만 순서가 다르면 false를 반환해야 합니다.', () => {
      expect(subsequenceUsingIterative('AXY', 'YADXCP')).toBe(false);
    });
  });

  describe('Boundary cases', () => {
    it('sequence가 빈문자열인 경우 true를 반환해야한다.', () => {
      expect(subsequenceUsingIterative('', 'ADXCPY')).toBe(true);
    });

    it('original이 빈문자열 이면서 sequence가 빈문자열이 아닌 경우 false를 반환해야한다.', () => {
      expect(subsequenceUsingIterative('AXY', '')).toBe(false);
    });

    it('original이 빈문자열 이면서 sequence가 빈문자열인 경우 true를 반환해야한다.', () => {
      expect(subsequenceUsingIterative('', '')).toBe(true);
    });
  });

  describe('Edge cases', () => {
  });
});
