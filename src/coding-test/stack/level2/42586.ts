export {};

/** 의도
 * 처음부터 순회 돌면서
 * 남은 날짜 구하고
 * 최근 남은 날짜 변수에 저장하고
 * 그다음 순회해서
 * 또 남은잘짜 구하고
 * 최근 남은날짜랑 비교해서
 * 작으면 남은날짜 +1 하고
 * 크면 1 새로 넣기
 */
// URL: https://school.programmers.co.kr/learn/courses/30/lessons/42586
function solution(progresses: number[], speeds: number[]): number[] {
  const answer: number[] = [];
  let latestBiggestRemain: number | undefined = undefined;

  for (let i = 0; i < progresses.length; i++) {
    const remain = Math.ceil((100 - progresses[i]) / speeds[i]);

    if (latestBiggestRemain !== undefined && latestBiggestRemain >= remain) {
      answer[answer.length - 1]++;
    } else {
      answer.push(1);
      latestBiggestRemain = remain;
    }
  }

  return answer;
}

/*************************************************************************************************************
 * 입출력 예시 (문제)
 *************************************************************************************************************/
// expected: [2, 1]
console.log(solution([93, 30, 55], [1, 30, 5]));
// expected: [1, 3, 2]
console.log(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]));
