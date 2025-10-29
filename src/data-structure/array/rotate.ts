/**
 * URL: https://www.geeksforgeeks.org/dsa/complete-guide-on-array-rotations/#1-rotate-one-by-one
 * Doc: https://docs.google.com/document/d/1x11Iyb-uSmG4Jr30_8Cn2IMsXneM7y11zCaq0VmW4kA/edit?tab=t.0
 */
export function rotateArrayUsingOneByOne(array: number[], distance: number, direction: 'left' | 'right'): number[] {
  /**
   * distance 만큼 반복하면서,
   * target = direction === 'left' ? array[0] : array[마지막]
   *
   * if(오른쪽이면)
   * 맨 왼쪽에 맨 마지막꺼 추가하고
   * 맨 오른쪽거를 삭제
   *
   * else면
   * 맨 오른쪽에 맨 왼쪽거 추가하고
   * 맨 왼쪽꺼를 삭제
   */
  return [];
}
