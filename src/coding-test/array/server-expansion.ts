/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/389479
 * Doc: https://docs.google.com/document/d/1x11Iyb-uSmG4Jr30_8Cn2IMsXneM7y11zCaq0VmW4kA/edit?tab=t.0
 */
export function getAccumulatedServerIncreasementCount(playerCounts: number[], maxPlayerCount: number, serverOperatingTime: number): number {
  /**
   * let 누적 서버 증가 횟수 저장
   * let 현재 운영중인 서버 목록 (추가된 시간, 댓수)
   *
   * 0부터 24시까지 players를 순회하면서
   * 1시간 마다 뭔가를 세는 컨셉으로 진행.
   *
   * const 현재 운영중인 서버 댓수 계산
   * const 현재 감당할 수 있는 최대 사용자 명수 계산
   * 현재 감당할 수 있는 최대 명수와 playerCount를 비교해서 추가로 필요한 서버 댓수를 뽑아온 다음
   * 위 let 변수 2개에 반영
   *
   * 운영중인 서버 순회하면서 serverOperatingTime을 지난 서버는 운영서버 목록에서 삭제
   */
  return 0;
}
