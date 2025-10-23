import {MinHeap} from '@/data-structure/tree/binary/complete/heap';

export type DiskControllerJob = [number, number];

/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42627
 * Doc: https://docs.google.com/document/d/1dUt9mYfzFzZBdQBK-qvHiyi2_6nEScqxEQd0IdvJs8c/edit?tab=t.0#heading=h.czr7uv2uqstm
 */
export function diskController(jobs: DiskControllerJob[]): number {
  if (jobs.length === 0) {
    return 0;
  }

  let accumulatedTime = 0;
  let accumulatedDurationTime = 0;

  /**
   * Set으로 만든 이유는,
   * remainJobs 에서 조건에 맞는 job을 waitingQueue에 넣고 && remainJobs에서는 삭제를 하기 위해
   * 아닌 job은 remainJob에 다시 넣기 위해서임.
   *
   * 이걸 Array로 개발하게되면 Array.prototype.splice()를 쓰던, Array.prototype.filter()를 쓰던, 시간복잡도는 결국 O(n)이 됨.
   */
  const remainJobs = new Set(jobs);

  const waitingQueue = new MinHeap<DiskControllerJob>((a, b) => {
    if (a[1] !== b[1]) {
      return a[1] - b[1];
    }

    return a[0] - b[0];
  });

  let processingJob: DiskControllerJob | undefined = undefined;

  while (remainJobs.size > 0 || waitingQueue.length > 0 || processingJob !== undefined) {
    // job의 요청시각이 내림차순이나 오름차순이라는 언급이 없어서 반복문 돌릴 떄마다 매번 전체 remainJob을 순회할 수밖에 없었음.
    for (const job of remainJobs) {
      if (job[0] <= accumulatedTime) {
        waitingQueue.add(job);
        remainJobs.delete(job);
      }
    }

    if (processingJob === undefined) {
      processingJob = waitingQueue.extractRoot();
    }

    if (processingJob && processingJob[1] >= 1) {
      processingJob[1]--;
    }

    accumulatedTime++;

    if (processingJob && processingJob[1] === 0) {
      accumulatedDurationTime += (accumulatedTime - processingJob[0]);
      processingJob = undefined;
    }
  }

  return Math.floor(accumulatedDurationTime / jobs.length);
}
