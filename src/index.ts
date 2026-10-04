export function solution(_n: number, weigh: number, gifts: number[]): 'YES' | 'NO' {
  /**
   * 엄청 큰 수 / [1, 2, 3, 4, 5, 6, 7, ... 1억]
   * [1]
   * [1, 1] / {2: true}
   * [1, 1, 2] / {2: true, 3: true}
   * [1, 1, 2, 2]
   */
  const restRecord: Record<number, true | undefined> = {};
  const countRecord: Record<number, number | undefined> = {};
  const pureGifts: number[] = [gifts[0]];

  for (let i = 1; i < gifts.length; i++) {
    if (restRecord[gifts[i]] !== undefined) {
      return 'YES';
    }

    const count = countRecord[gifts[i]];

    if (count && count > 2) {
      continue;
    }

    for (const pureGift of pureGifts) {
      restRecord[weigh - pureGift - gifts[i]] = true;
    }

    if (count === undefined) {
      countRecord[gifts[i]] = 1;
    } else {
      countRecord[gifts[i]] = count + 1;
    }

    pureGifts.push(gifts[i]);
  }

  return 'NO';
}
