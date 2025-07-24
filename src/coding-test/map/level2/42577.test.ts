import {solution42577} from '@/coding-test/map/level2/42577';
import {testWithRandomCases} from '@/utils/extend/test/jest';
import {range} from '@/utils/extend/data-type/number';
import {makeRandomString} from '@/utils/extend/test/generate-dummy';
import {shuffleArray} from '@/utils/extend/test/random';

// yarn test src/coding-test/map/level2/42577.test.ts
describe('solution42577()', () => {
  it('접두사가 먼저 나오는 경우 만족해야한다.', () => {
    expect(solution42577(['119', '97674223', '1195524421'])).toBe(false);
  });

  it('접두사가 뒤에 나오는 경우 만족해야한다.', () => {
    expect(solution42577(['97674223', '1195524421', '119'])).toBe(false);
  });

  it('접두사가 없는 경우 true를 반환해야한다.', () => {
    expect(solution42577(['123', '456', '789'])).toBe(true);
  });

  it('test random case', () => {
    testWithRandomCases({
      targetFunction: solution42577,
      generateCase: () => {
        const array = range(1, 50).map(() => makeRandomString('NUMBER', 20));
        const half = array[Math.floor(array.length / 2)].slice(0, 3);

        return {
          inputs: [shuffleArray(array.concat(half))] as const,
          expected: false
        };
      }
    });
  });
});
