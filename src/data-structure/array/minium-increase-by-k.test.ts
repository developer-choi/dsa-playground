import {miniumIncreaseByK} from '@/data-structure/array/minium-increase-by-k';

// yarn test src/data-structure/array/minium-increase-by-k.test.ts
describe('miniumIncreaseByK()', () => {
  describe('General cases', () => {
    it('예제는 만족해야한다', () => {
      expect(miniumIncreaseByK([4, 7, 19, 16], 3)).toBe(3);
    });

    it('조건을 만족시킬 수 없는 경우 -1을 반환해야 한다', () => {
      expect(miniumIncreaseByK([4, 2, 6, 8], 3)).toBe(-1);
    });
  });

  describe('Edge cases', () => {
    it('배열의 모든 요소가 같은 경우 0을 반환해야 한다', () => {
      expect(miniumIncreaseByK([4, 4, 4, 4], 3)).toBe(0);
    });
  });
});
