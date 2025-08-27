import {SortParam, SortResult} from '@/algorithm/sort/index';

interface InternalQuickSortParam extends SortParam {
  startIndex: number;
  endIndex: number;
}

/** Lomuto Partition 방식
 * Doc: https://docs.google.com/document/d/13g6Mgo9XKMkbhkPIWQVgrnxReukWf-ggSdCWMnoSxjA/edit?tab=t.0#heading=h.cysj7jhcq4td
 * Official: https://www.geeksforgeeks.org/quick-sort-algorithm/
 */
export default function quickSort({value: original, order}: SortParam): SortResult {
  const output = [...original];

  function sort({value, order, startIndex, endIndex}: InternalQuickSortParam) {
    // 재귀의 종료 조건: 부분 배열에 원소가 하나 이하로 남으면 이미 정렬된 상태로 간주합니다.
    if (startIndex >= endIndex) {
      return;
    }

    const pivotIndex = lomutoPartition({
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
  };
}

/** lomutoPartition() 시나리오
 * 1. 피벗 결정하고 (첫, 마지막, 중간, 랜덤 등)
 * 2. 원본 배열을 직접 수정해서 [피벗보다 작은값들], 피벗, [피벗보다 큰값들] 순서로 만든 다음
 * 3. 피벗의 최종 index를 반환함.
 */
function lomutoPartition({startIndex, endIndex, value: original, order}: InternalQuickSortParam): number {
  const pivotIndex = endIndex; // 긱스포긱스 예제 처럼 제일 마지막 요소를 피벗으로 선택하기로 함.
  const pivotValue = original[pivotIndex];

  /**
   * Pivot 보다 작은 요소만 모아놓기 위한 포인터.
   * 이 포인터와 같거나 좌측에 있으면 전부 피벗보다 작음.
   */
  let i = startIndex - 1;

  let j = startIndex; // Pivot 보다 작은 요소가 있는지 찾기 위해 계속 우측으로 이동한느 포인터

  while (j < pivotIndex) {
    const isTrue = order === 'asc' ? original[j] < pivotValue : original[j] > pivotValue;

    /**
     * pivot보다 작은 요소 (original[j]) 를 찾았기 때문에,
     * 그 요소를 아직 정렬되지않은 요소 (original[i+1])와 바꾸고 i 포인터를 우측으로 한칸 더 옮기기 위함.
     */
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
