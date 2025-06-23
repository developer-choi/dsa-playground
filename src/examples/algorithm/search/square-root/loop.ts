// https://www.geeksforgeeks.org/dsa/square-root-of-an-integer/
export default function squareRootUsingLoop(value: number): number {
  if (value < 0) {
    throw new TypeError('Value cannot be negative.');
  }

  let latestValue = 1;

  while (latestValue ** 2 <= value) {
    latestValue++;
  }

  return latestValue - 1;
}
