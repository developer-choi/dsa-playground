import {SortParam} from '@/algorithm/sort';

export function checkArrayIsSortedUsingIterative({value, order}: SortParam): boolean {
  /**
   * 배열의 길이가 1 이하면 무조건 true
   *
   * 이전값 선언하고 0번째 요소 할당
   * 1번째 부터 순회하면서 asc면 or desc면 이전값과 비교해서 다르면 return false
   *
   * 반복문 빠져나오면 return true
   */
  return true;
}

export function checkArrayIsSortedUsingRecursive({value, order}: SortParam): boolean {
  /**
   * 배열의 길이가 1 이하면 무조건 true
   */

  /**
   * 재귀함수 선언 (배열, 이전인덱스, 현재인덱스)
   * 현재 인덱스가 배열 범위 벗어나면 return true
   *
   * asc면 or desc면 현재인덱스값, 이전 인덱스 비교한 값을 저장
   *
   * if(false)면 return false
   * else면 return 재귀함수 호출하되 index + 1 하기로
   */
  return true;
}
