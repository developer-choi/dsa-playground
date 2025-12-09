import {solution} from './solution';

describe('Video Ranking', () => {
  test('example case', () => {
    expect(solution([1000, 500, 750, 500])).toEqual([
      {views: 1000, rank: 1},
      {views: 500, rank: 3},
      {views: 750, rank: 2},
      {views: 500, rank: 4},
    ]);
  });
});
