import {bruteForceDivisorsAndMultiples} from './solution';

describe('Divisors and Multiples', () => {
  test('example case', () => {
    expect(bruteForceDivisorsAndMultiples([1, 3, 4, 2, 6])).toEqual([4, 2, 2, 3, 3]);
  });
});
