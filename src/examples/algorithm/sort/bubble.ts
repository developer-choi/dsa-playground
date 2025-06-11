import {SortParam, SortResult} from './index';

export default function bubbleSort({order, value}: SortParam): SortResult {
  const result: number[] = [...value];
  let swapped = false;

  let comparisonCount = 0;
  let swapCount = 0;
  const loopHistory: number[][] = [];

  // Point 1. 배열에 요소가 n개면, 순회는 n-1번만 해도 됨. 제일 마지막 거는 순회 안해도 어차피 제일 왼쪽에 있을거니까.
  for (let i = 0; i < value.length - 1; i++) {
    swapped = false;

    // Point 2. 여기서 - 1을 더 해줘야, undefined가 안나옴.
    for (let j = 0; j < value.length - i - 1; j++) {
      const left = result[j];
      const right = result[j + 1];
      const isTrue = order === 'desc' ? left < right : left > right;

      comparisonCount++;
      if (isTrue) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapCount++;
        swapped = true;
      }
    }

    loopHistory.push([...result]);

    // Best case에서 Time Complexity를 O(n)으로 최적화 하는 방법
    if (!swapped) {
      break;
    }
  }

  return {
    value: result,
    comparisonCount,
    swapCount,
    loopHistory
  };
}
