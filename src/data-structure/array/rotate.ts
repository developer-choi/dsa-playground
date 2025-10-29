/**
 * URL: https://www.geeksforgeeks.org/dsa/complete-guide-on-array-rotations/#1-rotate-one-by-one
 * Doc: https://docs.google.com/document/d/1x11Iyb-uSmG4Jr30_8Cn2IMsXneM7y11zCaq0VmW4kA/edit?tab=t.0
 * Time Complexity: O(n * d)
 */
export function rotateArrayUsingOneByOne(array: number[], distance: number, direction: 'left' | 'right'): number[] {
  const result = [...array];
  const optimizatedRotate = distance % array.length;

  // O(d)
  for (let i = 0; i < optimizatedRotate; i++) {
    const lastIndex = result.length - 1;
    const target = direction === 'left' ? result[0] : result[lastIndex];
    const toCreateIndex = direction === 'left' ? lastIndex : 0;
    const toRemoveIndex = direction === 'left' ? 0 : lastIndex;

    // O(n)
    result.splice(toRemoveIndex, 1);
    result.splice(toCreateIndex, 0, target);
  }
  return result;
}
