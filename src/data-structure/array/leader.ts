/**
 * URL: https://www.geeksforgeeks.org/dsa/leaders-in-an-array/
 * Doc: https://docs.google.com/document/d/1x11Iyb-uSmG4Jr30_8Cn2IMsXneM7y11zCaq0VmW4kA/edit?tab=t.0
 * Time Complexity: O(n^2)
 */
export function leadersInArrayUsingBruteForce(array: number[]): number[] {
  const result: number[] = [];

  /**
   * for 1. i는 0부터 array 길이까지 시작
   * let isLeader = true로 초기화
   *
   * for 2. j는 i+1 부터 array 길이까지 시작
   * j가 i부터 시작하지않는 이유는 그럴 필요가 없어서. 어차피 i와 같을텐데 뭐하러.
   * i번쨰 요소가 j번째 요소보다 작거나 같으면 리더가 아니라는 소리이기 때문에 isLeader = false로 하고 즉시 배열중단
   *
   * 여전히 isLeader가 true면 우측으로 순회하는 내내 leader보다 큰게 없었다는 뜻이 되기 때문에
   * result에 추가
   */
  return result;
}
