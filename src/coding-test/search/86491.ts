export {};

// https://school.programmers.co.kr/learn/courses/30/lessons/86491
function solution(numbers: [number, number][]): number {
  /**
   * [모든 명함을 한 방향으로 정렬하기]
   * 지갑의 크기를 최소화하려면, 모든 명함의 긴 쪽은 지갑의 긴 쪽에, 짧은 쪽은 지갑의 짧은 쪽에 맞추는 것이 가장 좋습니다.
   * 즉, 모든 명함을 [긴 쪽, 짧은 쪽]으로 방향을 통일해야 합니다.
   */
  let leftBiggest = 0;
  let rightBiggest = 0;

  for(let i = 0 ; i < numbers.length ; i++) {
    let [left, right] = numbers[i];

    if (left < right) {
      [left, right] = [right, left];
    }

    if (left > leftBiggest) {
      leftBiggest = left;
    }

    if (right > rightBiggest) {
      rightBiggest = right;
    }
  }

  return leftBiggest * rightBiggest;
}

/*************************************************************************************************************
 * 입출력 예시 (문제)
 *************************************************************************************************************/
// expected: 4000
console.log(solution([[60, 50], [30, 70], [60, 30], [80, 40]]));
// expected: 120
console.log(solution([[10, 7], [12, 3], [8, 15], [14, 7], [5, 15]]));
// expected: 133
console.log(solution([[14, 4], [19, 6], [6, 16], [18, 7], [7, 11]]));
