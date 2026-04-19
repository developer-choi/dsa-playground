/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/43165
 */

export function recursive(numbers: number[], target: number): number {
  function internal(value: number, index: number): number {
    if (index >= numbers.length) {
      return value === target ? 1 : 0;
    }

    const left = internal(value + numbers[index], index + 1);
    const right = internal(value - numbers[index], index + 1);

    return left + right;
  }

  return internal(0, 0);
}
