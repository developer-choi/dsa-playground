import {rotateArrayUsingOneByOne} from '@/data-structure/array/rotate';

const algorithms = [
  {name: 'One by one', fn: rotateArrayUsingOneByOne},
];

// yarn test src/data-structure/array/rotate.test.ts
describe.each(algorithms)('Rotate array algorithms > $name', ({fn}) => {
  describe('General cases', () => {
    it('배열을 d번 오른쪽으로 회전시켜야 한다', () => {
      expect(fn([1, 2, 3, 4, 5, 6], 2, 'right')).toEqual([5, 6, 1, 2, 3, 4]);
    });

    it('배열을 d번 왼쪽으로 회전시켜야 한다', () => {
      expect(fn([1, 2, 3, 4, 5, 6], 2, 'left')).toEqual([3, 4, 5, 6, 1, 2]);
    });
  });

  describe('Boundary cases', () => {
    it('빈 배열을 전달하면 빈 배열을 반환해야 한다', () => {
      expect(fn([], 5, 'right')).toEqual([]);
      expect(fn([], 5, 'left')).toEqual([]);
    });

    it('요소가 하나인 배열은 변경되지 않아야 한다', () => {
      expect(fn([1], 5, 'right')).toEqual([1]);
      expect(fn([1], 5, 'left')).toEqual([1]);
    });
  });

  describe('Edge cases', () => {
    it('d가 배열의 길이보다 큰 경우, d % array.length 만큼 회전해야 한다', () => {
      expect(fn([1, 2, 3], 4, 'right')).toEqual([3, 1, 2]);
    });

    it('d가 배열의 길이와 같을 경우 배열이 변경되지 않아야 한다', () => {
      expect(fn([1, 2, 3], 3, 'right')).toEqual([1, 2, 3]);
      expect(fn([1, 2, 3], 3, 'left')).toEqual([1, 2, 3]);
    });

    it('d가 0일 경우 배열이 변경되지 않아야 한다', () => {
      expect(fn([1, 2, 3], 0, 'right')).toEqual([1, 2, 3]);
      expect(fn([1, 2, 3], 0, 'left')).toEqual([1, 2, 3]);
    });
  });
});
