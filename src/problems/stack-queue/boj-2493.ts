/**
 * URL: https://www.acmicpc.net/problem/2493
 * Description: 탑 - N개의 탑이 왼쪽으로 레이저를 쏠 때, 각 탑의 레이저를 수신하는 탑 번호 출력
 */

export function stack(heights: number[]): number[] {
  /**
   * // 여기에 저장되는 값은 index + 1값. 문제에서 index가 아니라 순서기빈이라서.
   * const answer: number[] = [];
   * const stacks: {index: number, height: number}[] = [];
   *
   * 탑을 순회하면서, 탑의 높이와 인덱스를 스택에 저장함.
   * 근데, 새로 넣은 탑의 높이거 이전 탑의 높이보다 높다면 기존 탑을 삭제해야함. 이게, 기존 스택을 모두 순회하면서 필요하다면 다 비워야할정도로 반복해야함.
   * [1, 2, 3, 4] 면 4만 낭마야하고,
   * [5, 4, 3, 2, 1]이면 [5, 4, 3, 2, 1] 다 남아야함.
   *
   * [1, 2, 3, 4] 에후에 3이 오든 5가 오든 [1,2,3]의 탑은 절대 신호를 수신하지못하기 때문임. 4가 있으니까.
   *
   * 순서대로 정리하면,
   * heights를 순회하면서
   * 1. stack 제일 위에있는걸 peek 해서
   * 2. 그게 height 보다 작으면 pop 해버리고
   * 3. 다시 1번부터 반복하고
   * 4. stack에 저장된것중 height보다 큰게 나타나면 answer에 stack의 index + 1을 해서 넣음.
   * 5. 안나타나면 0을 answer에 집어넣음.
   */

  return [];
}
