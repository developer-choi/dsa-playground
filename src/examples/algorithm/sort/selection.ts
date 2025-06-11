import {SortParam, SortResult} from '@/examples/algorithm/sort/index';

export default function selectionSort({value, order}: SortParam): SortResult {
  const result: number[] = [...value];

  let comparisonCount = 0;
  let swapCount = 0;
  const loopHistory: number[][] = [];

  for (let i = 0; i < value.length - 1; i++) {
    let minIndex = i;

    // 최소값 찾기, i 이전에는 이미 정렬된값이라서 확인하지않음.
    for(let j = i + 1 ; j < value.length; j++) {
      const isTrue = order === 'asc' ? result[minIndex] > result[j] : result[minIndex] < result[j];

      comparisonCount++;
      if(isTrue) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [result[minIndex], result[i]] = [result[i], result[minIndex]];
      swapCount++;
    }

    loopHistory.push([...result]);
  }

  return {
    value: result,
    loopHistory,
    comparisonCount,
    swapCount
  };
}
