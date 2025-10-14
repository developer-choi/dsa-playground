/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42626
 * Doc: https://docs.google.com/document/d/1dUt9mYfzFzZBdQBK-qvHiyi2_6nEScqxEQd0IdvJs8c/edit?tab=t.0#heading=h.czr7uv2uqstm
 */
export function heapScoville(scovilles: number[], k: number): number | -1 {
  if (scovilles.length === 0) {
    return -1;
  }

  /**
   * scoviles를 순회하면서
   * k 보다 큰건 일단 다 버리고
   * min heap에 죄다 추가 한 다음 (제일 위에있는거 = 제일 작은거)
   *
   * 이제 이 heap 가지고 문제를 풀면됨.
   *
   * if(heap.length === 0) 이면 안섞어도 전부 k보다 큰거니까 0 반환,
   *
   * count = 0; 으로 초기화 하고,
   * 아래 내용을 반복해야함. 언제까지? length가 1보다 클 때까지
   *
   * extractRoot()를 2번 한 다음 count +1 하고,
   * k보다 작으면 다시 넣고, 크면 버리고.
   *
   * 그 다음, heap의 길이가 1이면? 그 값은 반드시 k보다 작은거니까 (합이 컸으면 애초에 버려져서 heap 사이즈 0됐음;) 죄다합쳤지만 k보다 작다는 뜻으로 간주하고 -1 리턴
   * 그 외 count 리턴
   *
   * TODO 이렇게 한 경우, ([3], 5) / ([3], 1) 가 인풋으로 들어오는 케이스 모두 대응되나?
   * TODO 물론 코드를 줄여야하는데 밑에 조건문에서 걸러질 수 있게 위에서 fast return 안해도 동일한 동작 가능한가?
   */
  return 1;
}