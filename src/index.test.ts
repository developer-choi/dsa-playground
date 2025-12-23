import {getMaxProfit} from '@/index';

// yarn test src/index.test.ts
describe('getMaxProfit()', () => {
  describe('General cases', () => {
    it('예제는 만족해야한다', () => {
      expect(getMaxProfit([-3, 4, 3, -2, 2, 5], 4)).toBe(4);
    });
  });
});
