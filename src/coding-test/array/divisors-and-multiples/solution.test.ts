import {bruteForceDivisorsAndMultiples} from './solution';

// yarn test src/coding-test/array/divisors-and-multiples/solution.test.ts
describe('Divisors and Multiples', () => {
  test('example case', () => {
    expect(bruteForceDivisorsAndMultiples([1, 3, 4, 2, 6])).toEqual([4, 2, 2, 3, 3]);
  });
});
