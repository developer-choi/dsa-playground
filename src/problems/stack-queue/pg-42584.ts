/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42584
 */

export function stack(prices: number[]): number[] {
  if (prices.length === 0) {
    return [];
  }

  const priceAscIndexes: number[] = [];
  const answer: number[] = [];

  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];

    if (priceAscIndexes.length === 0) {
      priceAscIndexes.push(i);
      continue;
    }

    let initial = 1;
    for(let j = i ; j > 0 ; j--) {
      const top = prices[priceAscIndexes.length - 1];

      if (top > price) {
        answer[j - 1] = initial;
        priceAscIndexes.pop();
      } else {
        break;
      }

      initial++;
    }

    priceAscIndexes.push(i);
  }

  for(const index of priceAscIndexes) {
    answer[index] = prices.length - index - 1;
  }

  return answer;
}
