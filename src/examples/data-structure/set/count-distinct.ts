/**
 * URL: https://www.geeksforgeeks.org/dsa/count-distinct-elements-in-every-window-of-size-k
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 *
 * Time Complexity: O((n-size) * size^2) 합 3중루프
 */
export function bruteForceCountDistinct(array: number[], size: number): number[] {
  if (array.length < size) {
    throw new TypeError('size는 array.length보다 같거나 커야합니다.');
  }

  const result: number[] = [];

  // 여기서 O(n)
  for (let i = 0; i <= array.length - size; i++) {
    const distinctArray: number[] = [];

    // 여기서 O(size)
    for (let j = i; j < i + size; j++) {

      // 여기서 O(size)
      if (!distinctArray.includes(array[j])) {
        distinctArray.push(array[j]);
      }
    }

    if (distinctArray.length) {
      result.push(distinctArray.length);
    }
  }

  return result;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/count-distinct-elements-in-every-window-of-size-k/#naive-approach-traversing-all-windows-of-size-k-on-k-k-time-and-o1-space
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 *
 * Time Complexity: O((n-size) * size) 합 2중루프
 */
export function betterCountDistinct(array: number[], size: number): number[] {
  if (array.length < size) {
    throw new TypeError('size는 array.length보다 커야합니다.');
  }

  const result: number[] = [];

  // 여기서 O(n)
  for (let i = 0; i <= array.length - size; i++) {
    const set = new Set<number>();

    // 여기서 O(size)
    for (let j = i; j < i + size; j++) {

      // 여기서 O(1)로 기존 코드보다 개선이 있었음.
      if (!set.has(array[j])) {
        set.add(array[j]);
      }
    }

    if (set.size) {
      result.push(set.size);
    }
  }

  return result;
}
