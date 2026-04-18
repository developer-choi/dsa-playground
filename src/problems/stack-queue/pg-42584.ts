/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42584
 */

export function stack(prices: number[]): number[] {
  if (prices.length === 0) {
    return [];
  }

  const priceAscStack: {index: number, value: number;}[] = [{index: 0, value: prices[0]}];
  const answer: number[] = [];

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];

    if (priceAscStack[priceAscStack.length - 1].value <= price) {
      priceAscStack.push({index: i, value: price});
      continue;
    }

    while (priceAscStack.length > 0 && priceAscStack[priceAscStack.length - 1].value > price) {
      const currentStackIndex = priceAscStack[priceAscStack.length - 1].index;
      answer[currentStackIndex] = i - currentStackIndex;
      priceAscStack.pop();
    }
    priceAscStack.push({index: i, value: price});
  }

  for(const {index} of priceAscStack) {
    answer[index] = prices.length - index - 1;
  }

  return answer;
}
