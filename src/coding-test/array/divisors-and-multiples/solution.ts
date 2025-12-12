/**
 * URL: https://www.geeksforgeeks.org/dsa/count-the-divisors-or-multiples-present-in-the-array-for-each-element/
 */
export function bruteForceDivisorsAndMultiples(array: number[]): number[] {
  const max = Math.max(...array);

  // 같은 값 끼리는 매번 순회할 필요 없이 한번에 배수 / 약수인지 체크하기 위해
  const frequencyRecord: Record<number, number | undefined> = {};

  for (const num of array) {
    frequencyRecord[num] = (frequencyRecord[num] ?? 0) + 1;
  }

  const countRecord: Record<number, number | undefined> = {};

  for (let value = 1; value <= max; value++) {
    /** 컨셉
     * 배수를 찾으면서 약수를 같이 찾기. (약수찾으면서 배수찾기가 아님)
     * value = 기준
     * multiple = 그 기준의 배수값
     */
    for (let multiple = value; multiple <= max; multiple += value) {

      const frequencyOfMultiple = frequencyRecord[multiple] ?? 0;
      const frequencyOfValue = frequencyRecord[value] ?? 0;

      if (frequencyOfMultiple === 0 && frequencyOfValue === 0) {
        continue;
      }

      const countOfMultiple = countRecord[multiple] ?? 0;
      const countOfValue = countRecord[value] ?? 0;

      if (value === multiple) {
        countRecord[value] = countOfValue + (frequencyOfMultiple - 1);
      } else {
        countRecord[value] = countOfValue + frequencyOfMultiple;
        countRecord[multiple] = countOfMultiple + frequencyOfValue;
      }
    }
  }

  return array.map((num) => countRecord[num] ?? 0);
}
