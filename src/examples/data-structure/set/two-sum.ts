/**
 * URL: https://www.geeksforgeeks.org/dsa/check-if-pair-with-given-sum-exists-in-array/
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 * Time Complexity: O(n^2)
 */
export function bruteForceTwoSum(array: number[], target: number): boolean {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (i === j) {
        continue;
      }

      if (array[i] + array[j] === target) {
        return true;
      }
    }
  }

  return false;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/check-if-pair-with-given-sum-exists-in-array/#better-approach2-sorting-and-twopointer-technique-onlogn-time-and-o1-space
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 * TODO Time Complexity 이게 O(nlogn) + 좌우포인터 총 순회 수는 n 안넘어가니 n + nlogn 해서 nlogn 나오는건지...?
 */
export function twoPointersTwoSum(array: number[], target: number): boolean {
  let leftIndex = 0;
  let rightIndex = array.length - 1;
  const sorted = array.toSorted((a, b) => a - b);

  while (leftIndex < rightIndex) {
    const sum = sorted[leftIndex] + sorted[rightIndex];

    if (sum === target) {
      return true;
    }

    if (sum < target) {
      leftIndex++;
    } else {
      rightIndex--;
    }
  }

  return false;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/check-if-pair-with-given-sum-exists-in-array/#expected-approach-using-hash-set-on-time-and-on-space
 * Doc: https://docs.google.com/document/d/1FrE5Wok8hZ8ZqvwemWIDszaLQREG5uIXviMe67464-g/edit?tab=t.0
 * Time Complexity: O(n)
 */
// [1, 2, 3, 4, 5], 6
export function hashTwoSum(array: number[], target: number): boolean {
  const set = new Set<number>();

  for (const data of array) {
    if (set.has(data)) {
      return true;
    } else {
      set.add(target - data);
    }
  }

  return false;
}
