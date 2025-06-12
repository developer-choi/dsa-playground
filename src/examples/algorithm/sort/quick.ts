import {SortedHistoryLogger, SortParam, SortResult} from '@/examples/algorithm/sort/index';

interface InternalQuickSortParam extends SortParam {
  startIndex: number;
  endIndex: number;
}

/**
 * https://www.geeksforgeeks.org/quick-sort-algorithm/
 * Lomuto Partition 방식
 */
export default function quickSort({value: original, order}: SortParam): SortResult {
  const output = [...original];

  // 퀵 소트는 Divide And Conquer 방식으로 동작하여, 버블 소트처럼 선형으로 반복문을 실행하는 구조가 아닙니다.
  // 따라서 단계별 히스토리 로그는 다른 정렬처럼 직관적이지 않아 비활성화합니다.
  const logger = new SortedHistoryLogger({value: original, order: 'asc'}, {
    disableSwapHistory: true,
    disableCompareHistory: true
  });

  function sort({value, order, startIndex, endIndex}: InternalQuickSortParam) {
    // 재귀의 종료 조건: 부분 배열에 원소가 하나 이하로 남으면 이미 정렬된 상태로 간주합니다.
    if (startIndex >= endIndex) {
      return;
    }

    const pivotIndex = partition({
      order,
      value,
      endIndex,
      startIndex,
    });

    /**
     * 피벗기준 좌측을 정렬시킴.
     * 재귀로 호출되었다면 그 안에서는 또 그 안에서의 기준 좌측이 다 정렬됨.
     */
    sort({
      value,
      order,
      startIndex,
      endIndex: pivotIndex - 1
    });

    /**
     * 피벗기준 우측을 정렬시킴.
     * 재귀로 호출되었다면 그 안에서는 또 그 안에서의 기준 우측이 다 정렬됨.
     */
    sort({
      value,
      order,
      startIndex: pivotIndex + 1,
      endIndex
    });
  }

  sort({
    startIndex: 0,
    endIndex: output.length - 1,
    value: output,
    order
  });

  return {
    output,
    logger
  };
}

/** partition() 시나리오
 * 1. 피벗 결정하고 (첫, 마지막, 중간, 랜덤 등)
 * 2. 원본 배열을 직접 수정해서 [피벗보다 작은값들], 피벗, [피벗보다 큰값들] 순서로 만든 다음
 * 3. 피벗의 최종 index를 반환함.
 */
function partition({startIndex, endIndex, value: original, order}: InternalQuickSortParam): number {
  const pivotIndex = endIndex; // 긱스포긱스 예제 처럼 제일 마지막 요소를 피벗으로 선택하기로 함.
  const pivotValue = original[pivotIndex];

  let i = startIndex - 1;
  let j = startIndex;

  while (j !== pivotIndex) {
    const isTrue = order === 'asc' ? original[j] < pivotValue : original[j] > pivotValue;

    if (isTrue) {
      i++;
      [original[i], original[j]] = [original[j], original[i]];
    }

    j++;
  }

  [original[i + 1], original[pivotIndex]] = [original[pivotIndex], original[i + 1]];
  return i + 1;
}

// logSortAlgorithmCases(quickSort);
