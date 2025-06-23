import {range} from '@/utils/extend/data-type/number';

// https://www.geeksforgeeks.org/dsa/square-root-of-an-integer/
export default function squareRootUsingBinarySearch(value: number): number {
  if (value < 0) {
    throw new TypeError('Value cannot be negative.');
  }

  if (value === 0) {
    return 0;
  }

  return recursiveBinarySearch(range(1, value), 0, value - 1, value) + 1;
}

function recursiveBinarySearch(array: number[], startIndex: number, endIndex: number, target: number): number {
  if (startIndex >= endIndex) {
    if (array[endIndex] * array[endIndex] <= target) {
      return endIndex;
    } else {
      return endIndex - 1;
    }
  }

  const middleIndex = Math.floor((startIndex + endIndex) / 2);
  const middleValue = array[middleIndex] * array[middleIndex];

  if (middleValue === target) {
    return middleIndex;
  }

  if (middleValue > target) {
    return recursiveBinarySearch(array, startIndex, middleIndex - 1, target);
  } else {
    return recursiveBinarySearch(array, middleIndex + 1, endIndex, target);
  }
}
