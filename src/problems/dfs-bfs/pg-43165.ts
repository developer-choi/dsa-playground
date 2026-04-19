/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/43165
 */

export function recursive(numbers: number[], target: number): number {
  /** (시간순서대로 논리적으로 말이 이어지게 적어야함. 내가 컴퓨터리면 이런 사고흐름으로 A가 필요해서 했다 라는것)
   * 특별한 수학적 규칙이 없음. 즉 모든 경우의 수를 다 따져야함.
   * 근데, 경우의 수의 갈래는 n을 더한다 or 안더한다. 2가지씩 뻗어나옴.
   * 즉, 모든 경우의 수를 모두 구하기 위해 재귀함수를 사용. (DFS로 풀줄은모름)
   *
   * 시작은 0, 이걸 원소별로 경우의 수를 만든다.
   * function recursive(value: number, index: number): number {
   *   recursive(value + numbers[index])
   *   recursive(value - numbers[index])
   * }
   *
   * 이런식으로 더하거나, 빼거나 2개를 모두 하고
   * 그 합값이 target과 같다면, 1, 다르다면 0을 반환하게 하는데
   * 정확히는 리턴값을 받아서 1 또는 0을 추가로 더해서 반환하는걸로 하면 모든 경우의 수 집계 가능.
   *
   * 이걸 그래프로 표현하면, Perfect binary tree?
   */
  return 0;
}
