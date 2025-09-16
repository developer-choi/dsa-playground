import {findKthOrderValue} from '@/algorithm/kth/search';

// yarn test src/algorithm/kth/search.test.ts
describe('findKthOrderValue()', () => {
  it('should return the k-th largest value for the given examples', () => {
    expect(findKthOrderValue([12, 35, 1, 10, 34], 2, 'largest')).toBe(34);
    expect(findKthOrderValue([-10, -5, -2], 2, 'largest')).toBe(-5);
  });
});
