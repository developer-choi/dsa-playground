import {findKthElementInStream} from '@/algorithm/kth/stream';

// yarn test src/algorithm/kth/stream.test.ts
describe('findKthElementInStream()', () => {
  describe('General cases', () => {
    it('should return the correct kth element for each step of the stream', () => {
      expect(findKthElementInStream([1, 2, 3, 4, 5, 6], 4, 'largest')).toEqual([-1, -1, -1, 1, 2, 3]);
      expect(findKthElementInStream([10, 20, 5, 15], 2, 'largest')).toEqual([-1, 10, 10, 15]);
      expect(findKthElementInStream([3, 4], 1, 'largest')).toEqual([3, 4]);
    });

    it('should find the kth smallest element correctly', () => {
      expect(findKthElementInStream([10, 20, 11, 70, 50, 40, 100, 5], 4, 'smallest')).toEqual([-1, -1, -1, 70, 50, 40, 40, 20]);
    });
  });

  describe('Boundary cases', () => {
    it('should return an empty array for an empty input array', () => {
      expect(findKthElementInStream([], 0, 'largest')).toEqual([]);
    });

    it('should work correctly when order is 1', () => {
      expect(findKthElementInStream([3, 5, 2, 8], 1, 'largest')).toEqual([3, 5, 5, 8]);
    });
  });

  describe('Edge cases', () => {
    it('should throw a TypeError if the order is invalid', () => {
      const array = [1];
      const order = array.length + 5;
      expect(() => findKthElementInStream(array, order, 'largest')).toThrow(TypeError);
    });
  });
});
