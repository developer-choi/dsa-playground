export {};

// https://school.programmers.co.kr/learn/courses/30/lessons/42747
function solution(numbers: number[]): number {
  for (let i = numbers.length; i > 0; i--) {
    const isTrue = condition(numbers, i);

    if (isTrue) {
      return i;
    }
  }

  return 0;
}

// array가 boundary 이상인 값이 boundary개 이상이고, 나머지 (boundary 미만) 값의 갯수가 boundary값 보다 이하라면 true
function condition(array: number[], boundary: number): boolean {
  let sameOrBiggerCount = 0;

  for(const value of array) {
    if (value >= boundary) {
      sameOrBiggerCount++;
    }
  }

  const elseCount = array.length - sameOrBiggerCount;

  return sameOrBiggerCount >= boundary && elseCount <= boundary;
}

/*************************************************************************************************************
 * 입출력 예시 (문제)
 *************************************************************************************************************/
// expected: 3
console.log(solution([3, 0, 6, 1, 5]));

// expected: 6
console.log(solution([6, 6, 6, 6, 6, 6]));

// expected: 0
console.log(solution([0, 0, 0, 0, 0, 0]));
