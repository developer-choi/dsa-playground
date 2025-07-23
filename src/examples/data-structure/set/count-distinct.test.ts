import {bruteForceCountDistinct, betterCountDistinct} from '@/examples/data-structure/set/count-distinct';

const algorithms = [
  {name: 'Brute Force', fn: bruteForceCountDistinct},
  {name: 'Better', fn: betterCountDistinct},
];

// yarn test src/examples/data-structure/set/count-distinct.test.ts
describe.each(algorithms)('Count Distinct Algorithm > $name', ({fn}) => {
  describe('General cases', () => {
    expect(fn([1, 2, 1, 3, 4, 2, 3], 4)).toEqual([3, 4, 4, 3]);
    expect(fn([4, 1, 1], 2)).toEqual([2, 1]);
  });

  describe('Boundary cases', () => {
    it('window size 와 배열길이가 같으면 결과가...', () => {

    });
  });

  describe('Edge cases', () => {
    it('window size 보다 배열길이가 더 작으면 안된다.', () => {

    });

    it('window size 보다 배열길이가 더 작으면 안된다.', () => {

    });
  });
});
