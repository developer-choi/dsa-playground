/**
 * URL: https://www.geeksforgeeks.org/dsa/frequent-element-array/#naive-approach-nested-loops-on2-time-and-o1-space
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 *
 * Time Complexity: O(n^2)
 */
export function bruteForceMostFrequent(array: number[]): number | undefined {
  let maxCount = 0;
  let result: number | undefined = array[0];

  for (let i = 0; i < array.length; i++) {
    let count = 0;

    for (let j = 0; j < array.length; j++) {
      if (array[i] === array[j]) {
        count++;
      }

      if (count > maxCount) {
        result = array[i];
        maxCount = count;

      } else if (count === maxCount && result < array[i]) {
        result = array[i];
      }
    }
  }

  return result;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/frequent-element-array/#expected-approach-using-hashing-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 *
 * Time Complexity: O(n)
 */
export function mapMostFrequent(array: number[]): number | undefined {
  // key = 데이터값, value = 그 데이터의 횟수값
  const map = new Map<number, number>();

  for (const data of array) {
    const previousCount = map.get(data);

    if (!previousCount) {
      map.set(data, 1);
    } else {
      map.set(data, previousCount + 1);
    }
  }

  let maxCount = 0;
  let result = array[0];

  for (const [item, count] of map) {
    if (count > maxCount) {
      maxCount = count;
      result = item;

    } else if (count === maxCount && result < item) {
      result = item;
    }
  }

  return result;
}
