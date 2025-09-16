/**
 * Doc: https://docs.google.com/document/d/1kPMKSQSaUhiVBOv7nfBv-ah8zsnPXWUA-q0L6hVsqNo/edit?tab=t.0#heading=h.tovxn9cedrmb
 * Official: https://www.geeksforgeeks.org/dsa/find-second-largest-element-array/
 * 여기서 [Expected Approach] One Pass Search 를 구현한 코드임.
 *
 * @return 배열의 길이가 1 이하면 null이 반환됨.
 */
export function findSecondLargestElement(array: number[]): number | null {
  if (array.length <= 1) {
    return null;
  }

  let largest: number | null = array[0];
  let secondLargest: number | null = null;

  /**
   * 순회 하면서
   * largest 보다 크면
   * largest에 있던걸 secondLargest에 넣고
   * largest에 그걸 넣기
   */
  for(let i = 1 ; i < array.length ; i++) {
    const value = array[i];

    if (value > largest) {
      secondLargest = largest;
      largest = value;

      // if에서 value / largest 비교했지만 여기서 또 하는 이유는, value === largest인 케이스가 있어서 이걸 제외하기 위해.
    } else if (secondLargest === null || (value < largest && value > secondLargest)) {
      secondLargest = value;
    }
  }

  return secondLargest;
}

// Expected: 34
console.log(findSecondLargestElement([12, 35, 35, 1, 10, 34, 1]));
console.log(findSecondLargestElement([-10, -5, -2]));
