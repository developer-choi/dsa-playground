/**
 * URL: https://www.geeksforgeeks.org/dsa/check-given-array-contains-duplicate-elements-within-k-distance/
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 *
 * Time Complexity: O(k * n)이 맞음.
 */
export function bruteForceDuplicateDistance(k: number, array: number[]): boolean {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j <= i + k && j < array.length; j++) {
      if (array[i] === array[j]) {
        return true;
      }
    }
  }

  return false;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/check-given-array-contains-duplicate-elements-within-k-distance/
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 *
 * Time Complexity: O(n)
 */
export function hashDuplicateDistance(k: number, array: number[]): boolean {
  // key = data / value = index
  const map = new Map<number, number>();

  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    const duplicatedIndex = map.get(value);

    if (duplicatedIndex !== undefined && i - duplicatedIndex <= k) {
      return true;
    } else {
      map.set(value, i);
    }
  }

  return false;
}
