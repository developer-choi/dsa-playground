import {MinHeap} from '@/data-structure/tree/binary/complete/heap';

/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42626
 * Doc: https://docs.google.com/document/d/1dUt9mYfzFzZBdQBK-qvHiyi2_6nEScqxEQd0IdvJs8c/edit?tab=t.0#heading=h.czr7uv2uqstm
 */
export function heapScoville(scovilles: number[], k: number): number | -1 {
  // k보다 커서 힙에서 가장 최근에 버려진 스코빌지수값
  let latestScovileGreaterThanK: number | undefined = undefined;
  const minHeap = new MinHeap();

  for(const scoville of scovilles) {
    if (scoville >= k) {
      latestScovileGreaterThanK = scoville;
    } else {
      minHeap.add(scoville);
    }
  }

  let count = 0;

  while (minHeap.length >= 2) {
    const minimum = minHeap.extractRoot() as number;
    const second = minHeap.extractRoot() as number;
    const sumScovile = minimum + second * 2;
    count++; // 일단 섞었으니까 +1

    if (sumScovile >= k) {
      latestScovileGreaterThanK = sumScovile;
    } else {
      minHeap.add(sumScovile);
    }
  }

  /**
   * 모든 스코빌지수 혹은 섞은 스코빌지수들이 전부 k보다 커졌음
   */
  if (minHeap.length === 0) {
    return count;
  }

  // else > 길이가 1이다 = 섞어도 스코빌지수가 k보다 작았다

  // 마지막으로 남은 스코빌 지수가 k보다 작았지만, 직전에 남아있던 다른 스코빌지수와 섞어서 k보다 커질 수 있음.
  if (latestScovileGreaterThanK !== undefined) {
    return count + 1;
  }

  /**
   * 죄다 섞어봤지만 k보다 작은 케이스임.
   * latestScovileGreaterThanK 도 없었고,
   * 마지막으로 힙에 남은 스코빌 지수 조차도 k보다 작으니까.
   */
  return -1;
}