/**
 * URL: https://www.geeksforgeeks.org/dsa/count-the-divisors-or-multiples-present-in-the-array-for-each-element/
 * Doc: [Special Math Algorithm] https://docs.google.com/document/d/1yAd1YaOgrZrFpcfYhfQ1mru6R2Sa2ziZ5hrUNh8OL7M/edit?tab=t.0
 * Doc: [DS - Array] https://docs.google.com/document/d/1x11Iyb-uSmG4Jr30_8Cn2IMsXneM7y11zCaq0VmW4kA/edit?tab=t.0
 */
export function bruteForceDivisorsAndMultiples(array: number[]): number[] {
  let totalCount: number[] = [];

  for (let i = 0; i < array.length; i++) {
    let count = 0;

    for (let j = 0; j < array.length; j++) {
      const original = array[j];
      const target = array[i];

      if (j !== i && (original % target === 0 || target % original === 0)) {
        count++;
      }
    }

    totalCount.push(count);
  }

  return totalCount;
}

export function bestDivisorsAndMultiples(array: number[]): number[] {
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

      /**
       * 배수, 약수 관계가 아닌 케이스는 계산 할 필요가 없음.
       * [2, 4, 6, 8, 10] 인풋이 들어왔는데
       * 순회하던중 {value: 3, multiple: 6} 가 된 케이스라면 얼른 continue; 하는게 맞음.
       */
      if (frequencyOfMultiple === 0 || frequencyOfValue === 0) {
        continue;
      }

      const previousValue = countRecord[value] ?? 0;
      const previousMultiple = countRecord[multiple] ?? 0;

      if (value === multiple) {
        countRecord[value] = previousValue + (frequencyOfMultiple - 1);
      } else {
        countRecord[value] = previousValue + frequencyOfMultiple;
        countRecord[multiple] = previousMultiple + frequencyOfValue;
      }
    }
  }

  return array.map((num) => countRecord[num] ?? 0);
}
