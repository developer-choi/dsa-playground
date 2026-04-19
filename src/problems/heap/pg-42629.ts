/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42629
 * Description: 라면공장 — 해외 공장에서 최소 몇 번 밀가루를 공급받아야 하는지 반환
 */

export function recursive(stock: number, dates: number[], supplies: number[], k: number): number {
  /**
   * 계산할 수 있는 특별한 수학적 수식이 없음.
   * 그래서 모든 경우의 수를 전부 나열할 수 있는 풀이법을 선택해야했고, 그래서 재귀함수를 선택함.
   * 또, 특정날짜애 특정 보급을 받는다 안받는다라는 2가지 선택지만 가능했음.
   *
   * # 총 경우의 수
   * 1. 보급을 받아가며 버텼음
   * 2. 보급 (받을 수 있는데도) 덜받고 버티다가 망했음
   * 2. 보급 (이 부족해서 못받고) 버티다가 망했음 ==> TypeError (stock = 10 / dates = [1] / k가 1억)
   * 3. 재고가 너무 심각하게많아서 애초에 보급 안받아도 되는 경우 (stock 2억 / dates = [1] / k가 100)
   *
   * stock - k > 0 이면 그냥 return 0
   *
   * 1. 누적 제고 받은 횟수 반환
   * 2. 보급 덜받고 버티든 등 다양한 이유로 불가능한 케이스가 생기면 return string (reasom)
   * function recursive(current: {date: number, suppliedCount: number}, index: number): number | string {
   *   현재 재고를 stock에서 날짜 까고 보급받은거 더해서 구함.
   *
   *   현재 재고가 0 미만이면 return '해외보급 안받고 버티다가 재고가 부족해서 공장 가동이 멈췄어요'
   *   current.date가 k보다 크거나 같다면 return suppliedCount
   *   index가 dates의 길이보다 크거나 같다면 throw new TypeError('애초에 해외보급을 다 받았어도 보급 전까지 못버텼어요')
   *
   *   const nextStock = currentStock - dates[index];
   *   const left = recursive(다음 supplies를 받은거)
   *   const right = recursive(다음 supplies를 안받은거)
   *
   *   1. left랑 right랑 둘다 숫자면 둘중 더 작은 숫자 반환
   *   2. left가 숫자면 left 반환
   *   3. right가 숫자면 right 반환
   *   4. 둘다 같은 문자열일거라고 가정하고 left 반환
   * }
   */
  return 0;
}
