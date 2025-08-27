export function checkAllCowsCanPlace(stalls: number[], cowsCount: number, distance: number): boolean {
  /**
   * 첫 마굿간에 소 하나 넣고 (고정) ==> stalledCowIndexes = 1
   *
   * 다음 마굿간에 소 넣을 수 있는지 체크
   * 넣을 수 있으면 진행
   * 못넣으면 그 다음 마굿간은 소 넣을 수 있는지 체크
   *
   * 1. 모든 소를 마굿간에 다 넣었거나
   * 2. 더 이상 소를 넣을 다음 마굿간이 없는 경우 반복문 종료
   */

  let stalledCowsCount = 1;
  let lastStalledCowIndex = 0;
  let index = 1;

  while (stalledCowsCount < cowsCount && index < stalls.length) {
    const diff = stalls[index] - stalls[lastStalledCowIndex];

    if (diff >= distance) {
      stalledCowsCount++;
      lastStalledCowIndex = index;
    }

    index++;
  }

  return stalledCowsCount === cowsCount;
}

export function validateAggressiveCows(stalls: number[], cowsCount: number) {
  if (stalls.length < cowsCount) {
    throw new TypeError('마굿간 갯수보다 소 마릿수가 많습니다.');
  }

  if (stalls.length < 2) {
    throw new TypeError('마굿간 갯수는 최소 2개 이상이어야 합니다.');
  }

  const sortedStalls = stalls.toSorted((a, b) => a - b);
  const maxStallDistance = sortedStalls[sortedStalls.length - 1] - sortedStalls[0];

  return {
    sortedStalls,
    maxStallDistance,
  };
}
