export function solution(_n: number, weigh: number, gifts: number[]): 'YES' | 'NO' {
  /**
   * nn, [1, 2, 999, 1, 2, 888, 1, 2, 1, 3, 4]
   *
   * 저장 조건은 weight - 2 이하여야함. 드래야 gift, 1, 1 해서 더해서 weigh됨.
   * 너무 큰수도 저장할 필요가 없지만, 너무 작은 수도 저장할 필요가 없음.
   *
   * 1 ==> 저장
   * 2 ==> 저장
   * 999 ==> 저장할 필요가 없음.
   * 1 ==> ㅇㅇ 저장
   * 2 ==> ㅇㅇ 저장
   * 1 ==> 저장 할 필요가 없음. 이미 1이 2개가 있음.
   * 3 ==> 저장된것중에 합쳐서 nn-3인게 있나? 있으면 정답, 없으면 일단 저장.
   *
   *
   * 1 ==> 잠시대기
   * 2 ==> 1+2 제외한 나머지 저장
   * 3 ==> 1+3 제외한 나머지 / 2+3 제외한 나머지 저장
   * 4 ==> 1+4, 2+4, 3+4 제외한 나머지 저장
   *
   * gift 길이가 n개
   * 순회하면서 n개를 또 저장
   * O(n^2)
   *
   * const record: Record<number, number> = {}
   *
   * 1. gift를 순회 하면서 (n)
   * 2. record 조회해서 있으면 return (1)
   * 3. 없으면 record를 또 순회하면서 저장 (n)
   *
   * [1, 2, 3, 4, 5] ==> 1, [2, 3, 4, 5] 2회차부터 순회. ㄱㅊ N 3이상임
   */

  const record: Record<number, true | undefined> = {};

  // 일단 정렬. O(n log n)

  // 6, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  for (let i = 1; i < gifts.length; i++) {
    if (record[gifts[i]] !== undefined) {
      return 'YES';
    }

    for (let j = 0; j < i; j++) {
      record[weigh - gifts[j] - gifts[i]] = true;
    }
  }

  return 'NO';
}
