import {findKthOrderValuesInStream} from '@/algorithm/kth/stream';

// yarn test src/algorithm/kth/stream.test.ts
describe('findKthOrderValuesInStream()', () => {
  describe('General cases', () => {
    it('예제는 만족해야한다', () => {
      expect(findKthOrderValuesInStream([1, 2, 3, 4, 5, 6], 4, 'largest')).toEqual([-1, -1, -1, 1, 2, 3]);
      expect(findKthOrderValuesInStream([10, 20, 5, 15], 2, 'largest')).toEqual([-1, 10, 10, 15]);
      expect(findKthOrderValuesInStream([3, 4], 1, 'largest')).toEqual([3, 4]);
    });
  });

  describe('Boundary cases', () => {
    it('빈 배열이면 빈 배열이 반환되야한다.', () => {
      expect(findKthOrderValuesInStream([], 0, 'largest')).toEqual([]);
    });
  });

  describe('Edge cases', () => {
    it('배열 길이보다 order값이 더 크면 에러가 던져져야한다.', () => {
      const array = [1];
      const order = array.length + 5;
      expect(() => findKthOrderValuesInStream(array, order, 'largest')).toThrow(TypeError);
    });
  });
});
