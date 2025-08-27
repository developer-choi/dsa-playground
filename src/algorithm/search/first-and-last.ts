import {getMiddleIndex} from '@/utils/extend/browser/math';

/**
 * Doc: https://docs.google.com/document/d/1oryoLxF3hazneteLVUH8TAjlxVAkKZtTc-pUVzjuGKA/edit?tab=t.0
 * Official: https://www.geeksforgeeks.org/dsa/find-first-and-last-positions-of-an-element-in-a-sorted-array/
 */
export default function findFirstAndLast(array: number[], target: number): {firstIndex: number, lastIndex: number} {
  const firstIndex = binarySearch(array, 0, array.length - 1, target, 'first');
  const lastIndex = binarySearch(array, 0, array.length - 1, target, 'last');

  return {
    lastIndex,
    firstIndex
  };
}

function binarySearch(array: number[], startIndex: number, endIndex: number, target: number, mode: 'first' | 'last') {
  if (startIndex >= endIndex) {
    if (array[endIndex] !== target) {
      return -1;
    } else {
      return endIndex;
    }
  }

  const middleIndex = getMiddleIndex(startIndex, endIndex);
  const middleValue = array[middleIndex];

  // 중복된 수가 없는 배열에서의 이진탐색 처럼 탐색
  if (middleValue !== target) {
    if (middleValue > target) {
      return binarySearch(array, startIndex, middleIndex - 1, target, mode);
    } else {
      return binarySearch(array, middleIndex + 1, endIndex, target, mode);
    }

    // 중복된 수가 있는 배열에서는 가장 왼쪽 혹은 가장 오른쪽으로 한번 더 찾아야함
  } else {
    let index: number;

    if (mode === 'first') {
      index = binarySearch(array, startIndex, middleIndex - 1, target, mode);
    } else {
      index = binarySearch(array, middleIndex + 1, endIndex, target, mode);
    }

    // 더 작거나 (mode === 'first') 더 큰 (mode === 'last') 숫자를 찾으려고 헀는데 못찾았으면, 직전 middleIndex값이 boundary라는 뜻
    if (index === -1) {
      return middleIndex;
    } else {
      return index;
    }
  }
}

/* if (index === -1) 이 조건이 참이 되는 테스트 케이스 데이터
array = [
  0, 0, 1, 1, 2, 2, 3, 3, 4, 4,
  5, 5, 6, 6, 7, 7, 8, 8, 9, 9,
  10, 10, 11, 11, 12, 12, 13, 13, 14, 14,
  15, 15, 16, 16, 17, 17, 18, 18, 19, 19,
  20, 20, 21, 22
]
target = 1
 */