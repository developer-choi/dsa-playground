import {bruteForceProgrammers42576, mapSolutionProgrammers42576} from '@/coding-test/map/level1/42576';
import {randomNumber} from '@/utils/extend/test/random';
import {makeRandomString} from '@/utils/extend/test/generate-dummy';
import {range} from '@/utils/extend/data-type/number';
import {testWithRandomCases} from '@/utils/extend/test/jest';

const algorithms = [
  {name: 'Brute force', fn: bruteForceProgrammers42576},
  {name: 'Map', fn: mapSolutionProgrammers42576},
];

// yarn test src/coding-test/map/level1/42576.test.ts
describe.each(algorithms)('coding-test 42576 > $name', ({fn}) => {
  it('should handle cases without duplicate names', () => {
    expect(fn(['leo', 'kiki', 'eden'], ['eden', 'kiki'])).toBe('leo');
  });

  it('should handle cases with duplicate names', () => {
    expect(fn(['mislav', 'stanko', 'mislav', 'ana'], ['stanko', 'ana', 'mislav'])).toBe('mislav');
  });

  it('should produce the correct output for random inputs', () => {
    testWithRandomCases({
      targetFunction: fn,
      generateCase: () => {
        const param1 = range(1, 50).map(() => makeRandomString(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'], 6));
        const randomIndex = randomNumber(0, param1.length - 1);
        const param2 = param1.filter((_, index) => index !== randomIndex);
        const expected = param1[randomIndex];

        return {
          inputs: [param1, param2] as const,
          expected
        };
      }
    });
  });
});
