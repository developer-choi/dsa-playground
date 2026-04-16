/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42584
 */

export function stack(prices: number[]): number[] {
  if (prices.length === 0) {
    return [];
  }

  const priceAscStack: {value: number, index: number}[] = [];
  const answer: number[] = [];

  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];

    if (priceAscStack.length === 0) {
      priceAscStack.push({index: i, value: price});
      continue;
    }

    let initial = 1;
    for(let j = i ; j > 0 && priceAscStack.length ; j--) {
      const top = priceAscStack[priceAscStack.length - 1].value;

      if (top > price) {
        answer[j - 1] = initial;
        priceAscStack.pop();
      } else {
        break;
      }

      initial++;
    }

    priceAscStack.push({value: price, index: i});
  }

  for(const {index} of priceAscStack) {
    answer[index] = prices.length - index - 1;
  }

  return answer;
}
