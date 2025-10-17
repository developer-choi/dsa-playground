/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42627
 * Doc: https://docs.google.com/document/d/1dUt9mYfzFzZBdQBK-qvHiyi2_6nEScqxEQd0IdvJs8c/edit?tab=t.0#heading=h.czr7uv2uqstm
 */
export function diskController(jobs: [number, number][]): number {
  /**
   * minHeap 선언해서 root = 소요시간 제일 짧은거
   * accumulatedTime 선언해서 이 값을 기준으로 계쏙 더해서 나중에 반환함.
   * const remainJobs = [...jobs] 아 이부분 좀 찝찝하긴한데...
   * let processingJob: [number, number] | undefined
   */

  // while 반복문은 음... remainJobs.length가 1 이상이면 반복

  /**
   * remainJobs에서 시작시간이 accmulatedTime 이하인건 전부 heap에 넣고, 아닌건 remainJob에 넣기.
   * 이 부분에서 remainJobs를 전체순회하긴 해야함. jobs에서 시작시간이 오름차순이라는 조건이 문제에 없더라 그래서 배열 한참뒤에 막 엄청이르게 시작되는게 있을 수 있음.
   */

  /**
   * 현재 처리중인 job이 없으면 heap.extractRoot() 할당하기.
   *
   * 현재 처리중인 job의 잔여 소요시간이 0이면 undefined 할당
   *
   * 현재 처리중인 job에서 잔여 소요시간을 -1
   *
   * 제일 마지막에 accumulatedTime++
   */

  return 0;
}
