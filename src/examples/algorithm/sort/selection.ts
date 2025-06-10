import {SortParam} from './index';

export {};

function main() {
  console.log(selectionSort({order: 'asc', value: [5, 4, 3, 2, 1]}));
  console.log(selectionSort({order: 'desc', value: [2, 1, 4, 5, 3]}));
}

main();

/*************************************************************************************************************
 * Algorithm
 *************************************************************************************************************/
function selectionSort({value, order}: SortParam): number[] {
  const result: number[] = [...value];

  // Point 1. 제일 작은거 찾아서 왼쪽부터 채워나가기 때문에, 제일 마지막꺼는 굳이 안따져도 어차피 다 정렬되어있음.
  for (let i = 0; i < value.length - 1; i++) {
    const targetIndex = getTargetIndex(result, i, order);

    if (i !== targetIndex) {
      [result[i], result[targetIndex]] = [result[targetIndex], result[i]];
    }

    console.log(`${i} loop`, result);
  }

  return result;
}

/**
 * @description order === 'asc' 이면 smallIndex를 반환하고, 'desc'면 biggestIndex를 반환함.
 */
function getTargetIndex(value: number[], startIndex: number, order: SortParam['order']): number {
  let targetIndex = startIndex;

  for(let i = startIndex + 1 ; i < value.length; i++) {
    const item = value[i];

    const isTrue = order === 'asc' ? value[targetIndex] > item : value[targetIndex] < item;

    if(isTrue) {
      targetIndex = i;
    }
  }

  return targetIndex;
}
