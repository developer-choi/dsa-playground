import {myClosestElements} from '@/algorithm/closest';

const algorithms = [
  {name: '내 로직', fn: myClosestElements},
];

// yarn test src/algorithm/closest.test.ts
describe.each(algorithms)('Closet elements algorithms > $name', ({fn}) => {
  it('예제는 만족해야한다.', () => {
    expect(fn([12, 16, 22, 30, 35, 39, 42, 45, 48, 50, 53, 55, 56], 4, 35)).toEqual([39, 30, 42, 45]);
    expect(fn([1, 3, 4, 10, 12], 2, 4)).toEqual([3, 1]);
  });
});
