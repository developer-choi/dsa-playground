import {getMiddleIndex} from '@/utils/math';

/*************************************************************************************************************
 * Sorting 풀이법
 *************************************************************************************************************/
interface InternalItem {
  diff: number;
  value: number;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-k-closest-elements-given-value/
 * Doc: https://docs.google.com/document/d/1SnWr7qFcj2BbSY3u6ADiHrWtPJXDilBDvofuFDeAcWg/edit?tab=t.0
 * @param array
 * @param count target과 가장 가까운 요소 몇개를 반환할지
 * @param target 반드시 array에 있어야함.
 * Time Complexity: O(n * log n)
 */
export function myClosestElements(array: number[], count: number, target: number): number[] {
  let items: InternalItem[] = [];

  for (const data of array) {
    if (data !== target) {
      items.push({
        value: data,
        diff: Math.abs(target - data)
      });
    }
  }

  items.sort((a, b) => {
    if (a.diff !== b.diff) {
      return a.diff - b.diff;

    } else {
      return b.value - a.value; // GFG 문제에서 차이가 똑같으면 둘중 더 큰값으로 하라고 했음
    }
  });

  const result: number[] = [];

  for (const {value} of items) {
    if (value === target) {
      continue;
    }

    result.push(value);

    if (result.length === count) {
      break;
    }
  }

  return result;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-k-closest-elements-given-value/#naive-aprroach-using-absolute-difference-and-custom-sorting-onlogn-time-and-on-space
 * Doc: https://docs.google.com/document/d/1SnWr7qFcj2BbSY3u6ADiHrWtPJXDilBDvofuFDeAcWg/edit?tab=t.0
 * Time Complexity: O(n * log n)
 */
export function closestElementsUsingSort(array: number[], count: number, target: number): number[] {
  const items = array.toSorted((a, b) => {
    const diffA = Math.abs(target - a)
    const diffB = Math.abs(target - b);

    if (diffA !== diffB) {
      return diffA - diffB;

    } else {
      return b - a; // GFG 문제에서 차이가 똑같으면 둘중 더 큰값으로 하라고 했음
    }
  });

  const result: number[] = [];

  for (const value of items) {
    if (value === target) {
      continue;
    }

    result.push(value);

    if (result.length === count) {
      break;
    }
  }

  return result;
}

/*************************************************************************************************************
 * Two pointers 풀이법
 *************************************************************************************************************/

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-k-closest-elements-given-value/#better-approach-using-linear-search-on-time-and-ok-space
 * Doc: https://docs.google.com/document/d/1SnWr7qFcj2BbSY3u6ADiHrWtPJXDilBDvofuFDeAcWg/edit?tab=t.0
 * Time Complexity: O(c + n) - 선형탐색 때문에.
 */
export function closestElementsUsingLinearSearchTwoPointers(array: number[], count: number, target: number): number[] {
  return closestElementsUsingTwoPointers(array, count, target, getTargetIndexUsingLinearSearch);
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-k-closest-elements-given-value/#-2
 * Doc: https://docs.google.com/document/d/1SnWr7qFcj2BbSY3u6ADiHrWtPJXDilBDvofuFDeAcWg/edit?tab=t.0
 * Time Complexity: O(c + log n) - 이진 탐색 떄문에.
 */
export function closestElementsUsingBinarySearchTwoPointers(array: number[], count: number, target: number): number[] {
  return closestElementsUsingTwoPointers(array, count, target, getTargetIndexUsingBinarySearch);
}

/**
 * Doc: https://docs.google.com/document/d/1SnWr7qFcj2BbSY3u6ADiHrWtPJXDilBDvofuFDeAcWg/edit?tab=t.0
 * Time Complexity: O(c) + getTargetIndex() 만큼
 */
function closestElementsUsingTwoPointers(array: number[], count: number, target: number, getTargetIndex: (array: number[], target: number) => number): number[] {
  let targetIndex = getTargetIndex(array, target);
  let leftIndex = targetIndex - 1;
  let rightIndex = targetIndex + 1;

  const result: number[] = [];

  while (result.length < count && leftIndex >= 0 && rightIndex < array.length) {
    const leftValue = array[leftIndex];
    const rightValue = array[rightIndex];
    const leftDiff = Math.abs(leftValue - target);
    const rightDiff = Math.abs(rightValue - target);

    if (leftDiff < rightDiff) {
      result.push(leftValue);
      leftIndex--;
    } else if (leftDiff > rightDiff) {
      result.push(rightValue);
      rightIndex++;

      // 왼쪽 오른쪽 크기가 모두 같다면 둘중 더 큰쪽으로
    } else if (leftValue < rightValue) {
      result.push(rightValue);
      rightIndex++;

    } else if (leftValue > rightValue) {
      result.push(leftValue);
      leftIndex--;
    }
  }

  // 왼쪽 혹은 오른쪽 포인터가 배열 범위를 지난 경우 그 반대편 포인터로 count 대비 모자란만큼 더 넣어주기 위함
  while (result.length < count && leftIndex >= 0) {
    result.push(array[leftIndex]);
    leftIndex--;
  }

  while (result.length < count && rightIndex < array.length) {
    result.push(array[rightIndex]);
    rightIndex++;
  }

  return result;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/find-k-closest-elements-given-value/#better-approach-using-linear-search-on-time-and-ok-space
 * Doc: https://docs.google.com/document/d/1SnWr7qFcj2BbSY3u6ADiHrWtPJXDilBDvofuFDeAcWg/edit?tab=t.0
 * Time Complexity: O(n)
 */
function getTargetIndexUsingLinearSearch(array: number[], target: number): number {
  return array.findIndex(item => item === target);
}

function getTargetIndexUsingBinarySearch(array: number[], target: number): number {
  let middleIndex = getMiddleIndex(0, array.length - 1);
  let startIndex = 0;
  let endIndex = array.length - 1;

  while (array[middleIndex] !== target && startIndex <= endIndex) {
    if (array[middleIndex] < target) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex - 1;
    }

    middleIndex = getMiddleIndex(startIndex, endIndex);
  }

  return middleIndex;
}
