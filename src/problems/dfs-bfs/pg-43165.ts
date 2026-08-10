/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/43165
 */

export function recursive(numbers: number[], target: number): number {
  const cache: Record<`${number}-${number}`, number | undefined> = {};

  function internal(value: number, index: number): number {
    const dataInCache = cache[`${value}-${index}`];

    if (dataInCache !== undefined) {
      return dataInCache;
    }

    if (index >= numbers.length) {
      return value === target ? 1 : 0;
    }

    const left = internal(value + numbers[index], index + 1);
    const right = internal(value - numbers[index], index + 1);
    cache[`${value}-${index}`] = left + right;
    return left + right;
  }

  return internal(0, 0);
}
