/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42584
 */

export function stack(prices: number[]): number[] {
  /**
   * // 가격을 오름차순으로 집어넣을 스택 선언, 여기에는 prices에서 오름차순으로 저장되는 "index"만 저장
   * const priceAscIndexes: number[] = [];
   * const answer: number[] = [];
   *
   * prices를 순회하면서
   * 1. 스택 제일 위에있는값 (현존 최고값)과 비교해서
   * 1-1. 현재값이 더 크거나 같으면 스택에 저장
   * 1-2. 현재값이 더 작으면 현재 스택에서 꺼낸 그 값의 정답 인덱스 값에 1을 저장 후 날리고, [스택에서 현재값보다 같거나 작은값이 나올떄까지 반복] ==> 현재 값은 스택에 추가로 저장함.
   *
   * ==>
   * 이러면 answer는 듬성듬성됨.
   *
   * 이후 priceAscIndexes를 순회하면서,
   * 얘들은 마지막까지 자기보다 더 작은값이 안나온 애들이기때문에,
   * 배열길이 - 여기에 저장된값을 돌면서 answer에 추가
   */
}
