// https://school.programmers.co.kr/learn/courses/30/lessons/43238
function solution(people: number, times: number[]): number {
  const sortedTimes = times.toSorted((a, b) => a - b);
  const minTime = sortedTimes[0];
  const maxTime = sortedTimes[sortedTimes.length - 1];
}

function binarySearch(people: number, times: number[], start: number, end: number): number {
  if (start >= end) {
    return end;
  }
}

console.log(solution(5, [2, 1, 3]));

/**
 * 졸라 큰 시간일 때 모든 사람이 심사가 끝난다면
 * 그거보다 큰 시간은 반드시 다 끝난다.
 *
 * 그럼 그거보다 줄여가면서 체크를 하면됨.
 *
 * 그럼 최솟값 최댓값 어케잡음?
 * 최소값 = 사람수 / 입국심사로 나눠서 나머지 제외한 (몫 + 1) * 재일 적게걸리는 심사관의 시간값이 최솟값인듯? (딱 떨어지면 +1 안해도 됨)
 * 최대값 = 사람수 / 입국심사로 나눠서 나머지 제외한 (몫 + 1) * 재일 오래걸리는 심사관의 시간값이 최댓값인듯? (딱 떨어지면 +1 안해도 됨)
 *
 * 1. times를 오름차순 정렬해서 O(log n)
 * 2. 제일 큰 / 제일 작은 심사관 값을 뽑아서 O(1)
 * 3. 이진탐색 돌려가며(log n)
 * 4. check() 만들어서 그 시간안애 심사가 다 가능한지를 체크...?
 */

/**
 * 1. 사람 수에서 심사관의 길이를 일단 다 빼고 (처음에 동시에 모든 심사관에게 들어가니까)
 * 2. 뺀 나머지값이 음수면 0임. 사람보다 심사관이 많은거니까.
 *
 * 3. 그 뒤로는 심사관의 조합으로 최솟값 배열을 나머지 사람 수 만큼 만드는 문제인데?
 * ==>
 * 심사관의 조합으로 만들어질 수 있는 최솟값은 (0번째 인덱스는) 제일 시간 적게걸리는 심사관 1명이고
 * 최대값은 위에서 구한 그 값이 맞는데?
 */