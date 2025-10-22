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

  const remainJobs = new MinHeap<DiskControllerJob>((a, b) => {
    if (a[1] !== b[1]) {
      return a[1] - b[1];
    }

    return a[0] - b[0];
  });

  for (const job of jobs) {
    remainJobs.add(job);
  }

  let processingJob: DiskControllerJob | undefined = undefined;

  while (remainJobs.length > 0 || processingJob !== undefined) {
    if (processingJob === undefined && (remainJobs.peek() as DiskControllerJob)[0] <= accumulatedTime) {
      processingJob = remainJobs.extractRoot() as DiskControllerJob;
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
