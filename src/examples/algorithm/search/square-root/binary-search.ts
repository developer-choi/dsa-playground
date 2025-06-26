/**
 * Doc: https://docs.google.com/document/d/1oryoLxF3hazneteLVUH8TAjlxVAkKZtTc-pUVzjuGKA/edit?tab=t.0
 * Official: https://www.geeksforgeeks.org/dsa/square-root-of-an-integer/
 */
export default function squareRootUsingBinarySearch(value: number): number {
  if (value < 0) {
    throw new TypeError('Value cannot be negative.');
  }

  if (value === 0) {
    return 0;
  }

  return recursiveBinarySearch(0, value, value);
}

function recursiveBinarySearch(start: number, end: number, target: number): number {
  if (start >= end) {
    if (end * end <= target) {
      return end;
    } else {
      return end - 1;
    }
  }

  const middle = Math.floor((start + end) / 2);
  const square = middle * middle;

  if (square === target) {
    return middle;
  }

  if (square > target) {
    return recursiveBinarySearch(start, middle - 1, target);
  } else {
    return recursiveBinarySearch(middle + 1, end, target);
  }
}
