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

    it('배열의 길이가 1이어도 잘 되야한다.', () => {
      expect(() => nearlySorted([1], 0)).toThrow(TypeError);
    });

    it('배열의 길이가 0이어도 잘 되야한다.', () => {
      expect(() => nearlySorted([], 0)).toThrow(TypeError);
    });
  });

  describe('Edge cases', () => {
    it('배열이 이미 정렬되어있으면, 원본배열과 동일해야한다.', () => {
      const input = range(1, 10);
      expect(nearlySorted(input, 2)).toEqual(input);
    });
  });
});
