export default function iterativeBinarySearch(array: number[], target: number): number {
  let start = 0;
  let end = array.length - 1;

  while (true) {
    if (start > end) {
      break;
    }

    const middleIndex = Math.floor((start + end) / 2);
    const middleValue = array[middleIndex];

    if (middleValue === target) {
      return middleIndex;
    }

    if (middleValue > target) {
      end = middleIndex - 1;
    } else {
      start = middleIndex + 1;
    }
  }

  return -1;
}
