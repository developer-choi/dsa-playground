export default function findMinRotatedArray(array: number[]) {
  return recursive(array, 0, array.length - 1);
}

function recursive(array: number[], startIndex: number, endIndex: number): number {
  if (startIndex >= endIndex) {
    return array[endIndex];
  }

  const middleIndex = Math.floor((startIndex + endIndex) / 2);

  if (array[middleIndex] < array[endIndex]) {
    return recursive(array, middleIndex + 1, endIndex);
  } else {
    return recursive(array, startIndex, middleIndex - 1);
  }
}

console.log(findMinRotatedArray([2, 3, 1]));
console.log(findMinRotatedArray([3, 4, 1, 2]));
