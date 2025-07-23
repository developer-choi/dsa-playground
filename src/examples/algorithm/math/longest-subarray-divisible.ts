/**
 * URL: https://www.geeksforgeeks.org/dsa/longest-subarray-sum-divisible-k/#naive-approach-checking-all-subarrays-on2-time-and-o1-space
 * Doc: https://docs.google.com/document/d/1yAd1YaOgrZrFpcfYhfQ1mru6R2Sa2ziZ5hrUNh8OL7M/edit?tab=t.0
 *
 * Time Complexity: O(n^2)
 */
export function bruteForceLongestSubarrayDivisible(array: number[], divide: number): number {
  let result = 0;

  for (let i = 0; i < array.length; i++) {
    let sum = 0;

    for (let j = i; j < array.length; j++) {
      sum += array[j];

      const distance = j - i + 1;

      if (sum % divide === 0 && result < distance) {
        result = distance;
      }
    }
  }

  return result;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/longest-subarray-sum-divisible-k/#naive-approach-checking-all-subarrays-on2-time-and-o1-space
 * Doc: https://docs.google.com/document/d/1yAd1YaOgrZrFpcfYhfQ1mru6R2Sa2ziZ5hrUNh8OL7M/edit?tab=t.0
 *
 * Time Complexity: O(n)
 */
export function bestLongestSubarrayDivisible(array: number[], divide: number): number {
  // key = 나머지 / value = index
  const map = new Map<number, number>();
  let sum = 0;
  let maxLength = 0;

  map.set(0, -1);

  for (let i = 0; i < array.length; i++) {
    sum += array[i];
    const mod = sum % divide;
    const sameModIndex = map.get(mod);

    if (sameModIndex === undefined) {
      map.set(mod, i);
      continue;
    }

    const difference = i - sameModIndex;

    if (difference > maxLength) {
      maxLength = difference;
    }
  }

  return maxLength;
}
