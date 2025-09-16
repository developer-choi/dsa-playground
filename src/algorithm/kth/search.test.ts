import {findSecondLargestElement} from '@/algorithm/kth/search';

// yarn test src/algorithm/kth/search.test.ts
describe('findSecondLargestElement()', () => {
  it('예제는 만족해야한다.', () => {
    expect(findSecondLargestElement([12, 35, 35, 1, 10, 34, 1])).toBe(34);
    expect(findSecondLargestElement([-10, -5, -2])).toBe(-5);
  });
});
