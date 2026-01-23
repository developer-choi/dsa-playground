/**
 * URL: https://www.geeksforgeeks.org/dsa/find-maximum-minimum-sum-subarray-size-k/
 * Doc: https://docs.google.com/document/d/1x11Iyb-uSmG4Jr30_8Cn2IMsXneM7y11zCaq0VmW4kA/edit?tab=t.0
 */
export function maximumSizeKUsingSlidingWindow(array: number[], size: number): number {
  /**
   * const window = {value: 0, size: 0};
   * let max = -Infinity;
   *
   * [array 순회하기]
   * 먼저 window에 요소부터 넣고나서
   *
   * 1. 만약 window 사이즈가 size 보다 작으면 반복문 계속 진행
   * 2. 만약 window 사이즈가 size 이상이면 (특별한 체크로직)
   *
   * 이후 window에서 가장 나중에 추가됐던 요소 삭제하기
   *
   * 특별한 체크로직에는 현재 window 값 다 더해서 max랑 비교해서 더 큰값을 max에 저장 후 max 반환하기.
   *
   * 개발 다 끝나면 window를 class로 분리하기. array로 하게되면 매변 다 더하는거 연산해야함.
   */
  return 0;
}
