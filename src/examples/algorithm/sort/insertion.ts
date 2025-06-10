import {SortParam} from './index';

export {};

function main() {
  console.log('RESULT', insertionSort({order: 'asc', value: [1, 2, 3, 4, 5]})); // Best
  console.log('RESULT', insertionSort({order: 'asc', value: [5, 4, 3, 2, 1]})); // Worst
  console.log('RESULT', insertionSort({order: 'desc', value: [5, 4, 3, 2, 1]})); // Best
  console.log('RESULT', insertionSort({order: 'desc', value: [1, 2, 3, 4, 5]})); // Worst
}

main();

/*************************************************************************************************************
 * Algorithm
 *************************************************************************************************************/
function insertionSort({order, value}: SortParam): number[] {
  let result = [...value];

  // Point 1. 좌측 탐색해봤을 때 적절한 위치를 찾아야 하므로, 좌측이란게 존재하는 2번째 부터 탐색을 시작해야함.
  for(let i = 1 ; i < value.length; i++) {
    const betweenIndex = getBetweenIndex(result, i, order);

    if (betweenIndex !== undefined && betweenIndex !== i) {
      // TODO 여기서 존나게 손해보는데? 재배열만 2번을함 미친;
      result.splice(betweenIndex, 0, result[i]); // 적절한 자리에 삽입하기
      result.splice(i + 1, 1); // 삽입 전 원래 자리값은 지우기
    }

    console.log(`${i} loop`, result);
  }

  return result;
}

// Point 2. 적절한 위치가 없는 경우는, 이미 좌측부터 쭉 정렬이 되어있는 경우.
function getBetweenIndex(value: number[], targetIndex: number, order: SortParam['order']): number | undefined {
  const targetValue = value[targetIndex];

  for(let i = targetIndex - 1 ; i >= 0; i--) {
    const isTrue = order === 'asc' ? targetValue > value[i] : targetValue < value[i];

    console.log(targetValue, value[i]);

    if (!isTrue) {
      continue;
    }

    /**
     * 비교하다 (asc기준) target보다 작은 숫자를 만나면 멈추고 그 index를 반환함.
     * 단, 처음부터 바로 만나버리면 자리 안바꿈
     * 이를 통해, 이미 정렬된 배열 (Best) 케이스에서는 비교를 O(n) 만큼만 하게됨.
     */
    if (i === targetIndex - 1) {
      return undefined;
    } else {
      return i;
    }
  }

  return 0;
}
