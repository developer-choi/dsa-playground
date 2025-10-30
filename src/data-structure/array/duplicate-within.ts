/**
 * URL: https://www.geeksforgeeks.org/dsa/check-given-array-contains-duplicate-elements-within-k-distance/
 * Doc: https://docs.google.com/document/d/1JvljjsXl5iYjEGn9QCp-hKgioaxNZSI9S4-MHLpci7c/edit?tab=t.0
 * Time Complexity: O(n * d)
 */
export function duplicateWithinUsingBruteForce(array: number[], distance: number): boolean {
  for (let i = 0; i < array.length - distance; i++) {
    for (let j = i + 1; j <= i + distance; j++) {
      if (array[j] === array[i]) {
        return true;
      }
    }
  }

  return false;
}
