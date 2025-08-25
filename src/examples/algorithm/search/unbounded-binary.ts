import {getMiddleIndex} from '@/utils/extend/browser/math';

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

function recursive(f: Callback, start: number, end: number): number {
  if (start >= end) {
    return end;
  }

  const middle = getMiddleIndex(start, end);

  if (f(middle) > 0) {
    /** 주제 1. start는 start로 전달해야하는가? vs start + 1로 전달해야하는가?
     *
     * start는 이미 위에서 음수라고 판단되었음. ==> start + 1 전달해야한다? (X)
     * 그건 recursive()가 처음 호출되었을 때 얘기고, recursive() 안에서 또 recursive() 호출 시 아래 else 로직에 의해 start가 양수일 수 있음.
     * 그래서 start + 1이 아닌 start를 전달해야함.
     */

    /** 주제 2. end는 middle을 전달해야하는가? 아님 middle - 1을 전달해야하는가?
     *
     *  middle은 이미 양수임. 체크해봐야 의미있음? 하면서 middle - 1을 end에 전달한다? (X)
     *  그 middle이 제일 처음 양수로 바뀐 지점일지 누가앎?
     */
    return recursive(f, start, middle);
  } else {
    // 위와 같은 논리로 start, end에 +1을 하거나 안하거나 했음.
    return recursive(f, middle + 1, end);
  }
}
