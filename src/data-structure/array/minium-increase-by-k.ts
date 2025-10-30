import {calculateNumberTotal} from '@forworkchoe/core/utils';

/**
 * URL: https://www.geeksforgeeks.org/dsa/minimum-increment-k-operations-make-elements-equal/
 * Doc: https://docs.google.com/document/d/1x11Iyb-uSmG4Jr30_8Cn2IMsXneM7y11zCaq0VmW4kA/edit?tab=t.0
 */
export function miniumIncreaseByK(array: number[], k: number): number | -1 {
  const max = Math.max(...array);
  const diffCounts: number[] = [];

  for (const data of array) {
    if (data === max) {
      continue;
    }

    const diff = max - data;

    if (diff % k !== 0) {
      return -1;
    }

    diffCounts.push(diff / k);
  }

  return calculateNumberTotal(diffCounts);
}
