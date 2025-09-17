import {nearlySorted} from '@/algorithm/nearly-sorted';
import {range} from '@forworkchoe/core/utils';

// yarn test src/algorithm/nearly-sorted.test.ts
describe('nearlySorted()', () => {
  describe('General cases', () => {
    it('예제는 만족해야한다.', () => {
      expect(nearlySorted([6, 5, 3, 2, 8, 10, 9], 3)).toEqual([2, 3, 5, 6, 8, 9, 10]);
      expect(nearlySorted([1, 4, 5, 2, 3, 6, 7, 8, 9, 10], 2)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  });

  describe('Boundary cases', () => {
    it('배열의 길이가 2이어도 잘 되야한다.', () => {
      expect(nearlySorted([2, 1], 1)).toEqual([1, 2]);
    });

    it('nearlyCount가 0이어도 잘 동작해야한다.', () => {
      expect(nearlySorted([1, 2, 3, 4, 5], 0)).toEqual([1, 2, 3, 4, 5]);
    });

    it('배열의 길이가 0이면 빈배열을 반환해야한다.', () => {
      expect(nearlySorted([], 0)).toEqual([]);
    });
  });

  describe('Edge cases', () => {
    it('배열이 이미 정렬되어있으면, 원본배열과 동일해야한다.', () => {
      const input = range(1, 10);
      expect(nearlySorted(input, 2)).toEqual(input);
    });

    it('배열 내 요소가 중복되어있어도 잘 처리해야한다.', () => {
      expect(nearlySorted([2, 1, 3, 2], 2)).toEqual([1, 2, 2, 3]);
    });

    it('배열 길이보다 nearlyCount가 더 커도 에러가 던져져야한다.', () => {
      expect(() => nearlySorted([2, 1, 3, 2], 999)).toThrow(TypeError)
    });
  });
});
