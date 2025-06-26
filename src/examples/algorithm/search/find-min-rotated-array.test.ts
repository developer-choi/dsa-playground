import {randomRotatedNumberArray} from '@/utils/extend/test/generate-dummy';
import findMinRotatedArray from '@/examples/algorithm/search/find-min-rotated-array';

describe('findMinRotatedArray()', () => {
  describe('General cases', () => {
    it('임의의 순횐된 배열에서 최소값을 찾을 수 있어야 한다.', () => {
      for (let i = 0; i < 50; i++) {
        const array = randomRotatedNumberArray(100, 'asc');
        expect(findMinRotatedArray(array)).toBe(Math.min(...array));
      }
    })
  });

  describe('Edge cases', () => {
    it('길이가 0개인 배열에서는 null을 반환해야한다.', () => {
      expect(findMinRotatedArray([])).toBe(null);
    });

    it('길이가 1개인 배열에서도 최소값을 잘 찾을 수 있어야 한다.', () => {
      const value = 1;
      expect(findMinRotatedArray([value])).toBe(value);
    });

    it('길이가 2개인 배열에서도 최소값을 잘 찾을 수 있어야 한다.', () => {
      const array = [1, 2];
      expect(findMinRotatedArray(array)).toBe(Math.min(...array));
    });
  });
});