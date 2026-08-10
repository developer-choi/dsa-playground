import { MaxHeap } from '@/data-structure/heap';

/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42629
 * Description: 라면공장 — 해외 공장에서 최소 몇 번 밀가루를 공급받아야 하는지 반환
 */
export function solution(stock: number, dates: number[], supplies: number[], k: number): number {
  const accumulated = {
    stock,
    count: 0
  };
  let supplyState = {
    available: new MaxHeap(),
    cursor: -1
  };

  while (accumulated.stock < k) {
    const maxSurviveDate = accumulated.stock;
    const lastDateIndex = dates.length - 1;
    const suppliableDateIndex = dates[lastDateIndex] <= maxSurviveDate ? lastDateIndex : dates.findIndex(date => maxSurviveDate < date) - 1;

    for(let i = supplyState.cursor + 1 ; i <= suppliableDateIndex ; i++) {
      supplyState.available.add(supplies[i]);
    }

    supplyState.cursor = suppliableDateIndex;

    const supplied = supplyState.available.extractRoot();

    if (supplied === undefined) {
      throw new TypeError('회사가 재고가 부족해서 버틸 수 없었고, 파산했어요');
    }

    accumulated.stock += supplied;
    accumulated.count++;
  }

  return accumulated.count;
}
