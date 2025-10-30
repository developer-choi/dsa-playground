/**
 * URL: https://www.geeksforgeeks.org/dsa/check-given-array-contains-duplicate-elements-within-k-distance/
 * Doc: https://docs.google.com/document/d/1JvljjsXl5iYjEGn9QCp-hKgioaxNZSI9S4-MHLpci7c/edit?tab=t.0
 */
export function duplicateWithinUsingBruteForce(array: number[], distance: number): boolean {
  /**
   * array를 처음부터 끝까지 순회하면서 for i = 0;
   * let hasDuplicatedValue = false
   *
   * for j = i ; j < i + distance 까지 순회하면서
   * j 인덱스가 i인덱스 요소와 하나라도 같은지 체크해서 같은게 있으면 hasDuplicatedValue = true로 하고
   *
   * hasDuplicatedValue 가 true이면 넘어가고
   * false이면 즉시 return false
   */
  return false;
}
