import {checkAllCowsCanPlace, validateAggressiveCows} from '@/examples/algorithm/search/aggressive-cows/index';

export default function binarySearchAggressiveCows(stalls: number[], cowsCount: number): number | null {
  const {maxStallDistance, sortedStalls} = validateAggressiveCows(stalls, cowsCount);

  let result: number | null = null;
  let min = 1;
  let max = maxStallDistance;

  while (min <= max) {
    /**
     * min / max 중앙 인덱스 딱 찝어서
     * 1. currentDistance로 소 다 배치할 수 있으면? ==> 일단 result에 저장 한 다음 더 큰걸 뒤져야 하니 중앙인덱스 + 1 ~ max 뒤지고
     * 2. 다 배치 못하면? ==> 더 작은걸 뒤져야하니 min ~ 중앙인덱스 - 1 사이를 뒤져야함.
     */
    const middleDistance = Math.floor((min + max) / 2);

    if (checkAllCowsCanPlace(sortedStalls, cowsCount, middleDistance)) {
      result = middleDistance;
      min = middleDistance + 1;
    } else {
      max = middleDistance - 1;
    }
  }

  return result;
}
