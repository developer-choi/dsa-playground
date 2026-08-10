/**
 * URL: https://www.acmicpc.net/problem/2302
 * Description: 극장 좌석 — 고정된 VIP 좌석을 제외한 나머지 좌석에 인접 교환만 허용할 때 가능한 배치 수
 */

export function dp(seatCount: number, vipSeatArray: number[]): number {
  /**
   * [핵심 아이디어]
   * vip 떼고, 일반석만 봤을 때
   * [1,2,3,4,N-1,N] N개의 좌석이 있다고 가정하면, 여기서 경우의 수는 f(n) = f(n-1) + f(n-2)임.
   *
   * 그러므로, vip seat 기준으로 배열을 짜르고,
   * 그 배열마다 배열의 길이를 모두 구해서 모두 곱하면됨. (단, vip seat이 딱붙어서 그 사이 일반석이 없으면 1개로 침)
   *
   * [1,2,3,4], [5], [6,7,8,9], [10], [11,12,13] 이러면
   * 5x5x1x2 이렇게.
   *
   * 근데, 배열이 굳이 필요없기 때문에 위 규칙을 숫자 계산으로 충분히 가능.
   */
  return 0;
}
