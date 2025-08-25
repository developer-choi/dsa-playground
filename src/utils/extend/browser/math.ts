export function factorial(number: number): number {
  if (number < 0) {
    throw new TypeError(`number는 음수가 될 수 없습니다.\nnumber=${number}`);
  }

  let result = 1;

  for (let i = number; i >= 1; i--) {
    result *= i;
  }

  return result;
}

export function permutation(n: number, r: number) {
  return factorial(n) / factorial(n - r);
}

export function combination(n: number, r: number) {
  return permutation(n, r) / factorial(r);
}

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
