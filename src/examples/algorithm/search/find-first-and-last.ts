// https://www.geeksforgeeks.org/dsa/find-first-and-last-positions-of-an-element-in-a-sorted-array/
export default function findFirstAndLast(array: number[], target: number): {firstIndex: number, lastIndex: number} {
  const index = binarySearch(array, 0, array.length - 1, target);

  if (index === -1) {
    return {
      lastIndex: -1,
      firstIndex: -1
    };
  }

  let firstIndex = index;
  let lastIndex = index;

  while (array[firstIndex] === target) {
    firstIndex--;
  }

  while (array[lastIndex] === target) {
    lastIndex++;
  }

  return {
    firstIndex: firstIndex + 1,
    lastIndex: lastIndex - 1
  };
}

function binarySearch(array: number[], startIndex: number, endIndex: number, target: number) {
  if (startIndex >= endIndex && array[endIndex] !== target) {
    return -1;
  }

  const middleIndex = Math.floor((startIndex + endIndex) / 2);
  const middleValue = array[middleIndex];

  if (middleValue === target) {
    return middleIndex;
  }

  if (middleValue > target) {
    return binarySearch(array, startIndex, middleIndex - 1, target);
  } else {
    return binarySearch(array, middleIndex + 1, endIndex, target);
  }
}
