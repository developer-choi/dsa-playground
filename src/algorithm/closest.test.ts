import {
  closestElementsUsingBinarySearchTwoPointers,
  closestElementsUsingLinearSearchTwoPointers,
  closestElementsUsingSort,
  myClosestElements
} from '@/algorithm/closest';

const algorithms = [
  {name: '내 로직', fn: myClosestElements},
  {name: '정렬 풀이법을 이용한 로직', fn: closestElementsUsingSort},
  {name: 'Linear Search + Two Pointers', fn: closestElementsUsingLinearSearchTwoPointers},
  {name: 'Binary Search + Two Pointers', fn: closestElementsUsingBinarySearchTwoPointers},
];

// yarn test src/algorithm/closest.test.ts
describe.each(algorithms)('Closet elements algorithms > $name', ({fn}) => {
  describe('General cases', () => {
    it('예제는 만족해야한다.', () => {
      expect(fn([12, 16, 22, 30, 35, 39, 42, 45, 48, 50, 53, 55, 56], 4, 35)).toEqual([39, 30, 42, 45]);
      expect(fn([1, 3, 4, 10, 12], 2, 4)).toEqual([3, 1]);
    });

    it('차이가 똑같다면 더 큰 수가 먼저 와야한다.', () => {
      expect(fn([1, 3, 5], 2, 3)).toEqual([5, 1]);
      expect(fn([5, 3, 1], 2, 3)).toEqual([5, 1]);
    });
  });

  describe('Boundary cases', () => {
    it('taget이 array의 오른쪽 끝에 있더라도 잘 동작해야한다.', () => {
      expect(fn([1, 2, 3, 4, 5], 3, 5)).toEqual([4, 3, 2]);
    });

    it('taget이 array의 왼쪽 끝에 있더라도 잘 동작해야한다.', () => {
      expect(fn([1, 2, 3, 4, 5], 3, 1)).toEqual([2, 3, 4]);
    });
  });
});
