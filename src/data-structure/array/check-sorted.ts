import {SortParam} from '@/algorithm/sort';

/**
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
