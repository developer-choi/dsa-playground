export type Callback = (value: number) => number;

/**
 * Doc: https://docs.google.com/document/d/1oryoLxF3hazneteLVUH8TAjlxVAkKZtTc-pUVzjuGKA/edit?tab=t.0
 * Official: https://www.geeksforgeeks.org/dsa/find-the-point-where-a-function-becomes-negative/
 */
export default function unboundedBinarySearch(f: Callback) {
  if (f(0) > 0) {
    return 0;
  }

  if (f(1) > 0) {
    return 1;
  }

  let index = 2;

  while (f(index) <= 0) {
    index *= 2;
  }

  return recursive(f, index / 2, index);
}

function recursive(f: Callback, start: number, end: number) {
  if (start >= end) {
    return end;
  }

  /**
   * start값은 체크하지않고 start + 1값 부터 체크함.
   *
   * 예시)
   * 512 ~ 1024 범위에 양수로 바뀌는 지점이 있어서 이 함수가 호출됐을 꺼고,
   * 그럼 512는 음수인데 1024는 양수인거니까 이 함수가 호출됐을거니까.
   */
  if (f(start + 1) > 0) {
    return start + 1;
  }

  let additionalIndex = 2;

  while (f(additionalIndex + start) <= 0) {
    additionalIndex *= 2;
  }

  return recursive(f, start + additionalIndex / 2, start + additionalIndex);
}
