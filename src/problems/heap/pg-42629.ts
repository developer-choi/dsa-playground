/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42629
 * Description: 라면공장 — 해외 공장에서 최소 몇 번 밀가루를 공급받아야 하는지 반환
 */
export function recursive(stock: number, dates: number[], supplies: number[], k: number): number {
  if (stock > k) {
    return 0;
  }

  function getMinSuppliedCount(current: {date: number; suppliedCount: number;}, index: number): number | string {
    const currentStock = stock - current.date + current.suppliedCount;

    if (currentStock < 0) {
      return '해외보급 안받고 버티다가 재고가 부족해서 공장 가동이 멈췄어요';
    }

    if (index > dates.length) {
      throw new TypeError('애초에 해외보급을 다 받았어도 보급 전까지 못버텼어요');
    }

    const left = getMinSuppliedCount({date: current.date + dates[index + 1], suppliedCount: current.suppliedCount}, index + 1)
    const right = getMinSuppliedCount({date: current.date + dates[index + 1], suppliedCount: current.suppliedCount + supplies[index + 1]}, index + 1);

    if (typeof left === 'number' && typeof right === 'number') {
      return Math.min(left, right);
    }

    if (typeof left === 'number') {
      return left;
    }

    return right;
  }

  const minSuppliedCount = getMinSuppliedCount({date: 0, suppliedCount: 0}, 0);

  if (typeof minSuppliedCount === 'number') {
    return minSuppliedCount;
  } else {
    throw new TypeError(minSuppliedCount);
  }
}
