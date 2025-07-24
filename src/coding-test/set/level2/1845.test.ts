import {solution1845} from '@/coding-test/set/level2/1845';

// yarn test src/coding-test/set/level2/1845.test.ts
describe('solution1845()', () => {
  it('should satisfy the example cases', () => {
    expect(solution1845([3,1,2,3])).toBe(2);
    expect(solution1845([3,3,3,2,2,4])).toBe(3);
    expect(solution1845([3,3,3,2,2,2])).toBe(2);
  });
});
