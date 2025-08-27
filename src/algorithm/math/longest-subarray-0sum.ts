/**
 * URL: https://www.geeksforgeeks.org/dsa/find-the-largest-subarray-with-0-sum/#naive-approach-iterating-over-all-subarrays-on2-time-and-o1-space
 * Doc: https://docs.google.com/document/d/1yAd1YaOgrZrFpcfYhfQ1mru6R2Sa2ziZ5hrUNh8OL7M/edit?tab=t.0
 *
 * Time Complexity: O(n^2)
 */
export function bruteForceLongestSubarray0Sum(array: number[]): number {
  let maxLength = 0;

  for (let i = 0; i < array.length; i++) {
    let difference = 0;
    let sum = 0;

    for (let j = i; j < array.length; j++) {
      sum += array[j];

      if (sum === 0) {
        difference = j - i + 1;
      }

      if (difference > maxLength) {
        maxLength = difference;
      }
    }
  }

  return maxLength;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-the-largest-subarray-with-0-sum/#expected-approach-using-hashmap-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1yAd1YaOgrZrFpcfYhfQ1mru6R2Sa2ziZ5hrUNh8OL7M/edit?tab=t.0
 *
 * Time Complexity: O(n)
 */
export function bestLongestSubarray0Sum(array: number[]): number {
  // number = 총합, number = index
  const map = new Map<number, number>();
  let maxLength = 0;
  let sum = 0;

  map.set(0, -1);

  for (let i = 0; i < array.length; i++) {
    sum += array[i];

    const previousIndex = map.get(sum);

    if (previousIndex === undefined) {
      map.set(sum, i);
      continue;
    }

    const candidate = i - previousIndex;

    if (candidate > maxLength) {
      maxLength = candidate;
    }
  }

  return maxLength;
}
