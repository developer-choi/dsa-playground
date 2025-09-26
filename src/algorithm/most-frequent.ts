/**
 * URL: https://www.geeksforgeeks.org/dsa/find-k-numbers-occurrences-given-array/
 * Doc: https://docs.google.com/document/d/1vQsTFDtYka9TDtqLnOa9f8duk5HQqOtH_IdA2UtisH8/edit?tab=t.0
 * Time Complexity: O(n + + c + d * log d) 인데 n이 c보다 보통 크니까 무시하면 O(n + d * log d)
 * - 여기서 말하는 d는 distinct, sort 하는건 유일한 숫자들만 정렬하기 때문에 n * log n이 아님.
 */
export function getMostFrequentElementsUsingMap(array: number[], count: number): number[] {
  if (array.length < count) {
    throw new TypeError('count parameter는 array.length보다 클 수 없습니다.');
  }

  // key = item in array, value = count
  const map = new Map<number, number>();

  for (const data of array) { // O(n)
    const count = map.get(data); // O(1)

    if (count === undefined) {
      map.set(data, 1); // O(1)

    } else {
      map.set(data, count + 1); // O(1)
    }
  }

  // O(d * log d)
  const sorted = [...map].sort((a, b) => {
    const diffCount = b[1] - a[1];

    if (diffCount !== 0) {
      return diffCount;
    }

    return b[0] - a[0];
  });

  // O(c)
  return sorted.slice(0, count).map(item => item[0]);
}
