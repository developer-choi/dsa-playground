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

    const top = prices[priceAscIndexes[priceAscIndexes.length - 1]];

    if (top > price) {
      answer[i - 1] = 1;

      while (prices[priceAscIndexes[priceAscIndexes.length - 1]] > price) {
        priceAscIndexes.pop();
      }
    }

    priceAscIndexes.push(i);
  }

  for(const index of priceAscIndexes) {
    answer[index] = prices.length - index - 1;
  }

  answer[prices.length - 1] = 0;
  return answer;
}
