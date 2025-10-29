import {SortParam} from '@/algorithm/sort';

/**
 * URL: https://www.geeksforgeeks.org/dsa/program-check-array-sorted-not-iterative-recursive/#iterative-approach-on-time-and-o1-space
 * Doc: https://docs.google.com/document/d/1x11Iyb-uSmG4Jr30_8Cn2IMsXneM7y11zCaq0VmW4kA/edit?tab=t.0
 * Time Complexity: O(n)
 */
export function checkArrayIsSortedUsingIterative({value, order}: SortParam): boolean {
  if (value.length <= 1) {
    return true;
  }

  for (let i = 1; i < value.length; i++) {
    if (order === 'asc' && value[i - 1] > value[i]) {
      return false;
    }

    if (order === 'desc' && value[i - 1] < value[i]) {
      return false;
    }
  }

  return true;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/program-check-array-sorted-not-iterative-recursive/#recursive-approach-on-time-and-on-space-1
 * Doc: https://docs.google.com/document/d/1x11Iyb-uSmG4Jr30_8Cn2IMsXneM7y11zCaq0VmW4kA/edit?tab=t.0
 * Time Complexity: O(n)
 */
export function checkArrayIsSortedUsingRecursive({value, order}: SortParam): boolean {
  if (value.length <= 1) {
    return true;
  }

  function recursive(currentIndex: number) {
    if (currentIndex >= value.length) {
      return true;
    }

    if (order === 'asc' && value[currentIndex - 1] > value[currentIndex]) {
      return false;
    }
    if (order === 'desc' && value[currentIndex - 1] < value[currentIndex]) {
      return false;
    }

    return recursive(currentIndex + 1);
  }

  return recursive(1);
}
