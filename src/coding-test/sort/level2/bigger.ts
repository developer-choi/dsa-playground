export {};

// https://school.programmers.co.kr/learn/courses/30/lessons/42746
function solution(numbers: number[]) {
  const answer = numbers.map(number => number.toString()).sort((a, b) => {
    if (a === b) {
      return 0;
    }

    // 아이디어 > 이 방법이 문제와 더 가깝게 체크가 가능. 기존엔 임의의 수를 뒤에 붙여서 비교했지만...
    if (Number(a + b) < Number(b + a)) {
      return 1;
    } else {
      return -1;
    }
  });

  if (answer[0] === '0') {
    return '0';
  } else {
    return answer;
  }
}

/*************************************************************************************************************
 * 입출력 예시 (문제)
 *************************************************************************************************************/
// expected: [9, 5, 34, 3, 30]
console.log(solution([3, 30, 34, 5, 9]));

// expected: [0]
console.log(solution([0, 0, 0]));
