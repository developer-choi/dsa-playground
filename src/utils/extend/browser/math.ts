export function getMiddleIndex(startIndex: number, endIndex: number) {
  if (startIndex > endIndex) {
    throw new TypeError('startIndex is greater than endIndex.');
  }

  return Math.floor((startIndex + endIndex) / 2);
}

export function getMiddleItemOfArray<D>(array: D[]): D {
  if (array.length === 0) {
    throw new TypeError('Array is empty.');
  }

  return array[getMiddleIndex(0, array.length - 1)];
}
