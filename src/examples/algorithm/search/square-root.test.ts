import {range} from '@/utils/extend/data-type/number';
import squareRootUsingLoop from '@/examples/algorithm/search/square-root/loop';
import squareRootUsingBinarySearch from '@/examples/algorithm/search/square-root/binary-search';

const algorithms = [
  {name: 'squareRootUsingLoop', fn: squareRootUsingLoop},
  {name: 'squareRootUsingBinarySearch', fn: squareRootUsingBinarySearch},
];

describe.each(algorithms)('$name', ({fn}) => {
  describe('General cases', () => {
    const generalCases = range(5, 10).map(value => [value]);

    it.each(generalCases)(
      'should return the correct integer square root for %s',
      (value) => {
        expect(fn(value)).toBe(Math.floor(Math.sqrt(value)));
      },
    );
  });

  describe('Boundary cases', () => {
    const boundaryCases = [0, 1, 2, 3, 4].map(value => [value]);

    it.each(boundaryCases)(
      'should return the correct integer square root for boundary value %s',
      (value) => {
        expect(fn(value)).toBe(Math.floor(Math.sqrt(value)));
      },
    );
  });

  describe('Edge cases', () => {
    it('should throw an exception for a negative input (-1)', () => {
      expect(() => fn(-1)).toThrow(TypeError);
    });
  });
});
