import findNearestSmallerNumberOnLeftSide from '@/examples/data-structure/stack/problems/nearest/smaller';

// yarn test src/examples/data-structure/stack/problems/nearest/smaller.test.ts
describe('findNearestSmallerNumberOnLeftSide()', () => {
  it('문제에서 요구하는 예제 정도는 만족해야한다.', () => {
    expect(findNearestSmallerNumberOnLeftSide([1, 6, 2])).toEqual([-1, 1, 1]);
    expect(findNearestSmallerNumberOnLeftSide([1, 5, 0, 3, 4, 5])).toEqual([-1, 1, -1, 0, 3, 4]);
  });
});