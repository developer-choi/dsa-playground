/**
 * Doc: https://docs.google.com/document/d/1oryoLxF3hazneteLVUH8TAjlxVAkKZtTc-pUVzjuGKA/edit?tab=t.0#heading=h.hii6vn2uoj99
 * Official: https://www.geeksforgeeks.org/dsa/assign-stalls-to-k-cows-to-maximize-the-minimum-distance-between-them/
 */

/**
 * 최소거리 = 1
 * 최대거리 = 마지막 마굿간 - 첫 마굿간
 *
 * 최소거리부터 최대거리까지 매번 확인해서
 * 유효했던 거리의 가장 마지막값을 반환.
 */
export default function bruteForceAggressiveCows(stalls: number[], cowsCount: number): number | null {
  if (stalls.length < cowsCount) {
    throw new TypeError('마굿간 갯수보다 소 마릿수가 많습니다.');
  }

  if (stalls.length < 2) {
    throw new TypeError('마굿간 갯수는 최소 2개 이상이어야 합니다.');
  }

  const sortedStalls = stalls.toSorted((a, b) => a - b);
  const maxStallDistance = sortedStalls[sortedStalls.length - 1] - sortedStalls[0];
  let distance: number | null = null;

  for (let i = 1; i <= maxStallDistance; i++) {
    if (checkAllCowsCanPlace(sortedStalls, cowsCount, i)) {
      distance = i;
    }
  }

  return distance;
}

function checkAllCowsCanPlace(stalls: number[], cowsCount: number, distance: number): boolean {
  /**
   * 첫 마굿간에 소 하나 넣고 (고정) ==> stalledCowIndexes = [0]
   *
   * 다음 마굿간에 소 넣을 수 있는지 체크
   * 넣을 수 있으면 진행
   * 못넣으면 그 다음 마굿간은 소 넣을 수 있는지 체크
   *
   * 1. 모든 소를 마굿간에 다 넣었거나
   * 2. 더 이상 소를 넣을 다음 마굿간이 없는 경우 반복문 종료
   */

  const stalledCowIndexes = [0];
  let stallingCowIndex = 1;

  while (stalledCowIndexes.length < cowsCount && stallingCowIndex < stalls.length) {
    const lastStalledCowIndex = stalledCowIndexes[stalledCowIndexes.length - 1];
    const checkingDistance = stalls[stallingCowIndex] - stalls[lastStalledCowIndex];

    if (checkingDistance >= distance) {
      stalledCowIndexes.push(stallingCowIndex);
    }

    stallingCowIndex++;
  }

  return stalledCowIndexes.length === cowsCount;
}
