import {checkAllCowsCanPlace, validateAggressiveCows} from '@/examples/algorithm/search/aggressive-cows/index';

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
  const {maxStallDistance, sortedStalls} = validateAggressiveCows(stalls, cowsCount);

  let distance: number | null = null;

  for (let i = 1; i <= maxStallDistance; i++) {
    if (checkAllCowsCanPlace(sortedStalls, cowsCount, i)) {
      distance = i;
    }
  }

  return distance;
}
