import {range} from '@/utils/extend/data-type/number';
import squareRootUsingLoop from '@/examples/algorithm/search/square-root/loop';

describe('squareRootUsingLoop()', () => {
  describe('General cases', () => {
    const GENERAL_RANGE = range(5, 30);
    it('일반적인 케이스일 때 값이 맞아야한다.', () => {
      GENERAL_RANGE.forEach(value => {
        expect(squareRootUsingLoop(value)).toBe(Math.floor(Math.sqrt(value)));
      });
    });
  });

  describe('Boundary cases', () => {
    const BOUNDARY_VALUE = [0, 1];
      it(`[0, 1, 2] 같은 Boundary Case도 대응되야한다.`, () => {
        BOUNDARY_VALUE.forEach(value => {
          expect(squareRootUsingLoop(value)).toBe(value);
        });
      });
  });
});
