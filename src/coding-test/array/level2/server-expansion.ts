/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/389479
 * Doc: https://docs.google.com/document/d/1x11Iyb-uSmG4Jr30_8Cn2IMsXneM7y11zCaq0VmW4kA/edit?tab=t.0
 */
export function serverExpansionSolution(players: number[], maxUserLimit: number, operatingTime: number) {
  /**
   * let 현재 운영중인 서버 = []; {startedHours: number}[]가 좋겠음.
   * let 누적 서버 증설횟수 = 0;
   *
   * players 순회 돌면서 - O(n)
   * const isExceed = boolean 으로 계산 하고, boolean에는 현재 서버갯수와 maxUserLimit으로 계산.
   *
   * if(isExceed) 이면
   * 서버댓수 + n
   * 누적서버증설횟수 + n
   *
   * 운영중인 서버들 중 operatingTime을 지난 서버들은 모두 종료처리
   */

  /** TODO
   * 음 시간복잡도가
   * 1. 순회 - O(n)
   * 2. 종료되야하는 서버 찾기 - 음... 뭐라고 표시하지 음...
   * 암튼 이거 2개 곱해야함.
   */
  return 0;
}
