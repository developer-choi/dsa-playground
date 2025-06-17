export {};

/**
 * URL = https://school.programmers.co.kr/learn/courses/30/lessons/42747
 *
 * 접근방법)
 * h의 최대값은 배열의 길이값.
 * h의 최소값은 0. [0, 0, 0, 0] ==> 0
 * 그러므로 h값은 0부터 배열의 길이값만큼만 따져보면 됨.
 */
function solution(numbers: number[]): number {
  // 근데 h의 최대값을 찾으라고 했기 때문에, 역순으로 순회를 하되, 0은 순회할 필요 없이 그냥 return 0 하면 됨.
  // 잘 생각해보면, 0은 언제나 H-index가 될 수 있기 때문임.
  for (let i = numbers.length; i > 0; i--) {
    const isTrue = condition(numbers, i);

    if (isTrue) {
      return i;
    }
  }

  return 0;
}

/**
 * h번 이상 인용된 논문이 h편 이상이고 나머지 논문이 h번 이하 인용되었다면
 * ⇒
 * 나머지 = h보다 작은 배열 요소들 이라는 뜻이므로, 위 문장에 단어를 대체하면
 *
 * “[h보다 작은 배열 요소들]이 h번 이하 인용되었다면” 가 됨.
 * ⇒
 * h보다 작은 배열 요소의 갯수가 h값 이하라면 라는 말이 됨.
 *
 * 즉, 조건 = array가 boundary 이상인 값이 boundary개 이상이고, 나머지 (boundary 미만) 값의 갯수가 boundary값 보다 이하라면 true
 */
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
