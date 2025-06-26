import {SortedHistoryLogger, SortParam, SortResult} from './index';

/**
 * Doc: https://docs.google.com/document/d/1uUJcHrpaSY0dRU2gHYX9jVB07WA2n-dCZhQsEie21fo/edit?tab=t.0#heading=h.7j039rgq82wk
 * Official: https://www.geeksforgeeks.org/insertion-sort-algorithm/
 */
export default function insertionSort({order, value}: SortParam): SortResult {
  const logger = new SortedHistoryLogger({order, value});
  let output = [...value];

  // 5, 4, 3, 2, 1

  // We start with the second element of the array as the first element is assumed to be sorted.
  for (let i = 1; i < value.length; i++) {
    // 역순으로 스왑해가며 자리 찾아가기
    for (let j = i; j > 0; j--) {
      const isTrue = order === 'asc' ? output[j] >= output[j - 1] : output[j] <= output[j - 1];

      logger.onBeforeCompare(output, j, j - 1);
      if (isTrue) {
        break;
      }

      logger.onBeforeSwap(output, j, j - 1);
      [output[j], output[j - 1]] = [output[j - 1], output[j]];
    }

    logger.onLoopEnd(output);
  }

  return {
    output,
    logger
  };
}

// logSortAlgorithmCases(insertionSort);