import {solution} from '@/index';

describe('코딩테스트', () => {
  it('문제 예시는 만족해야한다.', () => {
    const gifts = [1, 2, 3];
    expect(solution(gifts.length, 6, gifts)).toEqual('YES');
  });
  it('문제 예시는 만족해야한다.', () => {
    const gifts = [5, 3, 9, 1, 2];
    expect(solution(gifts.length, 10  , gifts)).toEqual('YES');
  });
  it('문제 예시는 만족해야한다.', () => {
    const gifts = [5, 3, 9, 1, 2];
    expect(solution(gifts.length, 18, gifts)).toEqual('NO');
  });
});
