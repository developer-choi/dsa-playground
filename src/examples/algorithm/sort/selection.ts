import {SortedHistoryLogger, SortParam, SortResult} from '@/examples/algorithm/sort/index';

/**
 * Doc: https://docs.google.com/document/d/1uUJcHrpaSY0dRU2gHYX9jVB07WA2n-dCZhQsEie21fo/edit?tab=t.0#heading=h.7j039rgq82wk
 * Official: https://www.geeksforgeeks.org/selection-sort-algorithm-2/
 */
export default function selectionSort({value, order}: SortParam): SortResult {
  const logger = new SortedHistoryLogger({order, value});
  const output: number[] = [...value];

  for (let i = 0; i < value.length - 1; i++) {
    let minIndex = i;

    // 최소값 찾기, i 이전에는 이미 정렬된값이라서 확인하지않음.
    for (let j = i + 1; j < value.length; j++) {
      const isTrue = order === 'asc' ? output[minIndex] > output[j] : output[minIndex] < output[j];

      logger.onBeforeCompare(output, minIndex, j);
      if (isTrue) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      logger.onBeforeSwap(output, minIndex, i);
      [output[minIndex], output[i]] = [output[i], output[minIndex]];
    }

    logger.onLoopEnd(output);
  }

  return {
    output,
    logger
  };
}

// logSortAlgorithmCases(selectionSort);