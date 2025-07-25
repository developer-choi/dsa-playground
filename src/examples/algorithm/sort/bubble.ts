import {SortedHistoryLogger, SortParam, SortResult} from './index';

/**
 * Doc: https://docs.google.com/document/d/1uUJcHrpaSY0dRU2gHYX9jVB07WA2n-dCZhQsEie21fo/edit?tab=t.0#heading=h.7j039rgq82wk
 * Official: https://www.geeksforgeeks.org/bubble-sort-algorithm/
 */
export default function bubbleSort({order, value}: SortParam): SortResult {
  const logger = new SortedHistoryLogger({order, value});
  const output: number[] = [...value];
  let swapped = false;

  // Point 1. 배열에 요소가 n개면, 순회는 n-1번만 해도 됨. 제일 마지막 거는 순회 안해도 어차피 제일 왼쪽에 있을거니까.
  for (let i = 0; i < value.length - 1; i++) {
    swapped = false;

    // Point 2. 여기서 - 1을 더 해줘야, undefined가 안나옴.
    for (let j = 0; j < value.length - i - 1; j++) {
      const left = output[j];
      const right = output[j + 1];
      const isTrue = order === 'desc' ? left < right : left > right;

      logger.onBeforeCompare(output, j, j + 1);
      if (isTrue) {
        logger.onBeforeSwap(output, j, j + 1);
        [output[j], output[j + 1]] = [output[j + 1], output[j]];
        swapped = true;
      }
    }

    logger.onLoopEnd(output);

    // Best case에서 Time Complexity를 O(n)으로 최적화 하는 방법
    if (!swapped) {
      break;
    }
  }

  return {
    output,
    logger
  };
}

// logSortAlgorithmCases(bubbleSort);