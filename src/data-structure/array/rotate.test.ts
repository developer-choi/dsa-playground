import {rotateArrayUsingOneByOne} from '@/data-structure/array/rotate';

const algorithms = [
  {name: 'One by one', fn: rotateArrayUsingOneByOne},
];

// yarn test src/data-structure/array/rotate.test.ts
describe.each(algorithms)('Rotate array algorithms > $name', ({fn}) => {
  it('배열을 d번 오른쪽으로 회전시켜야 한다', () => {
    expect(fn([1, 2, 3, 4, 5, 6], 2, 'right')).toEqual([5, 6, 1, 2, 3, 4]);
  });

  it('d가 배열의 길이보다 큰 경우, d % array.length 만큼 회전해야 한다', () => {
    expect(fn([1, 2, 3], 4, 'right')).toEqual([3, 1, 2]);
  });
});
