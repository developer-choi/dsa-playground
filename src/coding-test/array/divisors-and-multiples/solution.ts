/**
 * URL: https://www.geeksforgeeks.org/dsa/count-the-divisors-or-multiples-present-in-the-array-for-each-element/
 * Doc: [Special Math Algorithm] https://docs.google.com/document/d/1yAd1YaOgrZrFpcfYhfQ1mru6R2Sa2ziZ5hrUNh8OL7M/edit?tab=t.0
 * Doc: [DS - Array] https://docs.google.com/document/d/1x11Iyb-uSmG4Jr30_8Cn2IMsXneM7y11zCaq0VmW4kA/edit?tab=t.0
 */
export function bruteForceDivisorsAndMultiples(array: number[]): number[] {
  let totalCount: number[] = [];

  for (let i = 0; i < array.length; i++) {
    let count = 0;

    for (let j = 0; j < array.length; j++) {
      const original = array[j];
      const target = array[i];

      if (j !== i && (original % target === 0 || target % original === 0)) {
        count++;
      }
    }

    totalCount.push(count);
  }

  return totalCount;
}
