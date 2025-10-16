/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42626
 * Doc: https://docs.google.com/document/d/1dUt9mYfzFzZBdQBK-qvHiyi2_6nEScqxEQd0IdvJs8c/edit?tab=t.0#heading=h.czr7uv2uqstm
 */
export function heapScoville(scovilles: number[], k: number): number | -1 {
  /**
   * // k보다 커서 힙에서 버려진 스코빌지수값
   * const latestScovileGreaterThanK = undefined;
   *
   * scoviles를 순회하면서
   * k 보다 큰건 일단 다 버리고 - latestScovileGreaterThanK 에 넣기
   * min heap에 죄다 추가 한 다음 (제일 위에있는거 = 제일 작은거)
   *
   * 이제 이 heap 가지고 문제를 풀면됨.
   *
   * count = 0; 으로 초기화 하고,
   *
   * 아래 내용을 반복해야함. 언제까지? length가 1보다 클 때까지
   *
   * extractRoot()를 2번 한 다음 count +1 하고,
   * k보다 작으면 다시 넣고, 크면 버리고.
   *
   * 그 다음, heap의 길이가 0이면? 섞었더니 전부다 k보다 커서 아무런문제가없는경우 count 리턴
   * 그 외 (길이가 1이면) 그 값은 반드시 k보다 작은거니까 (합이 컸으면 애초에 버려져서 heap 사이즈 0됐음;) latestScovileGreaterThanK 값이 있으면 count+1 / 없으면 -1 (싹다 섞어봤지만 k보다 작아서)
   */
  return 1;
}