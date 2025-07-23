import {bruteForceProgrammers42576, mapSolutionProgrammers42576} from '@/coding-test/map/level1/42576';
import {randomNumber} from '@/utils/extend/test/random';
import {makeRandomString} from '@/utils/extend/test/generate-dummy';
import {range} from '@/utils/extend/data-type/number';

const algorithms = [
  {name: 'Brute force', fn: bruteForceProgrammers42576},
  {name: 'Map', fn: mapSolutionProgrammers42576},
];

// yarn test src/coding-test/map/level1/42576.test.ts
describe.each(algorithms)('coding-test 42576 > $name', ({fn}) => {
  test('동명이인이 없는 케이스', () => {
    expect(fn(['leo', 'kiki', 'eden'], ['eden', 'kiki'])).toBe('leo');
  });

  test('동명이인이 있는 케이스', () => {
    expect(fn(['mislav', 'stanko', 'mislav', 'ana'], ['stanko', 'ana', 'mislav'])).toBe('mislav');
  });

  test('랜덤 테스트', () => {
    for (let i = 0; i < 100; i++) {
      const param1 = range(1, 50).map(() => makeRandomString(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'], 6));
      const randomIndex = randomNumber(0, param1.length - 1);
      const param2 = param1.filter((_, index) => index !== randomIndex);
      const expected = param1[randomIndex];
      const output = fn(param1, param2);

      try {
        expect(output).toEqual(expected);
      } catch (error) {
        console.error({
          param1: JSON.stringify(param1),
          param2: JSON.stringify(param2),
          expected: JSON.stringify(expected),
          output: JSON.stringify(output)
        });
        throw error;
      }
    }
  });
});
