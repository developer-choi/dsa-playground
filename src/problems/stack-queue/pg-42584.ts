/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42584
 */

// expect(fn([1, 2, 3, 2, 3])).toEqual([4, 3, 1, 1, 0]);
export function stack(prices: number[]): number[] {
  /**
   * 오름차순 가격스택 (가격값, 가격인덱스)
   * 정답배열 선언
   *
   * prices 순회하면서 {
   * top vs prices 비교해만셔
   *
   * 일단 스택 빈배열이면 가격스택에 넣고  continue;
   *
   * 1. top < price ==> 스택에 저장
   * 2. while(top >= price) {
   * 일단 stack pop부터.
   * answer의 top index에는 top index와 price index의 차이만큼 구해서 넣기.
   * }
   * 그렇게 while 끝나면 stack에 price 넣기
   * }
   */

  // stack 순회하면서, price 전체 길이와 stack에 저장된 그 인덱스를 뺀만큼 answer에 저장 후 반환
  return [];
}
