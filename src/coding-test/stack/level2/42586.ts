export {};

interface Candidate {
  remain: number;
  togetherDeployCount: number;
}

/** 의도
 * 처음부터 순회 돌면서
 * 남은 날짜 구하고
 * candidates에 저장하고
 * 그다음 순회해서
 * 또 남은잘짜 구하고
 * 가장 최근에 저장한거 꺼내와서
 * 작으면 남은날짜 +1 하고
 * 크면 1 새로 넣기
 *
 * 다른 아이디어)
 * 순회를 총 2번할 까 생각도 했었음.
 * 1회차 > 남은일 수만 따로 계산해두고
 * 2회차 > 그 남은일수로 연산하기
 *
 * 하지만 난 순회 1번만 하고싶었음.
 * 물론 마지막엔 그냥 편하게 리턴하려고 candidates 배열 map 돌면서 마무리하긴했지만,
 * 이것도 candidates 저장할 때 answer도 같이 저장하면 그만이긴했음.
 */
// URL: https://school.programmers.co.kr/learn/courses/30/lessons/42586
function solution(progresses: number[], speeds: number[]): number[] {
  const candidates: Candidate[] = [];

  for (let i = 0; i < progresses.length; i++) {
    const remain = Math.ceil((100 - progresses[i]) / speeds[i]);

    if (candidates.length === 0) {
      candidates.push({
        remain,
        togetherDeployCount: 1
      });
      continue;
    }

    const top = candidates[candidates.length - 1];

    if (top.remain >= remain) {
      candidates[candidates.length - 1].togetherDeployCount++;
    } else {
      candidates.push({
        remain,
        togetherDeployCount: 1
      });
    }
  }

  return candidates.map(candidate => candidate.togetherDeployCount);
}

/*************************************************************************************************************
 * 입출력 예시 (문제)
 *************************************************************************************************************/
// expected: [2, 1]
console.log(solution([93, 30, 55], [1, 30, 5]));
// expected: [1, 3, 2]
console.log(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]));
