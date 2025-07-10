export {};

/**
 * URL = https://school.programmers.co.kr/learn/courses/30/lessons/12906?language=javascript
 *
 * 접근방법)
 * 1. 순회 하면서 가장 최근에 집어넣은 데이터가 target이랑 똑같은지를 체크해야겠다
 * 2. 그럼 가장 최근에 집어넣은 데이터를 알아야하네? 그럼 LIFO 자료구조가 필요하곘구나
 * 3. 그럼 Stack이네
 */
function solution(array: number[]): number[] {
  const stack: number[] = [];

  for (const target of array) {
    const top = stack[stack.length - 1];

    if (top !== target) {
      stack.push(target);
    }
  }

  return stack;
}

/*************************************************************************************************************
 * 입출력 예시 (문제)
 *************************************************************************************************************/
// expected: [1,3,0,1]
console.log(solution([1,1,3,3,0,1,1]));

// expected: [4,3]
console.log(solution([4,4,4,3,3]));
