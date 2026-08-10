/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/43165
 */

export function recursive(numbers: number[], target: number): number {
  const cache: Record<`${number}-${number}`, number | undefined> = {};
  let callCount = 0;

  function internal(value: number, index: number): number {
    callCount++;
    const dataInCache = cache[`${value}-${index}`];

    if (dataInCache !== undefined) {
      return dataInCache;
    }

    if (index >= numbers.length) {
      const result = value === target ? 1 : 0;
      cache[`${value}-${index}`] = result;
      return result;
    }

    const left = internal(value + numbers[index], index + 1);
    const right = internal(value - numbers[index], index + 1);

    return left + right;
  }

  const result = internal(0, 0);
  console.log(`callCount=${callCount}`);
  return result;
}
