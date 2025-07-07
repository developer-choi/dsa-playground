import {stockSpanUsingLoop} from '@/examples/data-structure/stack/problems/stock-span';

// yarn test src/examples/data-structure/stack/problems/stock-span.test.ts
describe('stockSpanUsingLoop()', () => {
  it('문제 예시와 동일하게 동작해야한다.', () => {
    expect(stockSpanUsingLoop([100, 80, 60, 70, 60, 75, 85])).toEqual([1, 1, 1, 2, 1, 4, 6]);
    expect(stockSpanUsingLoop([10, 4, 5, 90, 120, 80])).toEqual([1, 1, 2, 4, 5, 1]);
  })
});
