/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42629
 * Description: 라면공장 — 해외 공장에서 최소 몇 번 밀가루를 공급받아야 하는지 반환
 */
export function solution(stock: number, dates: number[], supplies: number[], k: number): number {
  /*
  핵심은, 기왕이면 한번 공급받을 떄 왕창 받아서, 공급횟수를 최소화 하는것.
  ==>
  재고 내에 가장 많은 공급을 주는 날짜까지 버텨야함.
  ==>
  재고 내 받을 수 있는 공급 목록은 parameter로 주어지지만, 그 안에 가장많은 공급을 지속적으로 뽑아야하니, MaxHeap이 필요.
  그 다음은, 갱신만 잘 하면됨. 날짜 지나고, 공급 받고, 더하고 등 계산만 하면됨.
   */

  /*
  # 필요한 변수 목록
  1. 현재 재고 (잔여재고)
  2. 누적 공급받은 횟수
  3. 누적 재고 (최초 재고, 이후 공급받아서 받은 재고 총합)
  4. var 받을 수 있는 재고 목록 - MaxHeap
  5. var 기존에 받을 수 있엇던 재고 목록 cursor

  # 핵심 로직
  while(누적 재고 < k) {
    [공급 받고 각종 상태 데이터 업데이트]

    반복문 1번 = 공급 1회 받는것.
  }

  # 핵심로직 2 (공급 1회 받는 플로우)
  const 언제까지버틸수있나요값 = 누적 재고값
  const 받을 수 있는 재고 목록 cursor = dates 배열 뒤져서 [언제까지버틸수있나요값] 보다 "작거나 같은" 제일 큰 index를 저장
  이전 커서 ~ 이후 커서 index 만큼 heap에 추가추가해서 갱신

  -- 여기까지 해서 공급받을 준비를 하고 --

  heap에서 하나 꺼내서 공급 받고 현재, 누적 상태값들 업데이트.

  1. 근데 만약 heap이 비어있다? 그럼 throw new TypeError('공급 다 받아도 못버텨요') 에러 던지면됌. (문제 잘못)
  2. cursor는 직전이랑 같을 수 있음. 한번에 heap에 막 3개씩 넣어놓고 cursor 변화없이 3번 공급만 받을 수도 있음.
   */
  return 0;
}
