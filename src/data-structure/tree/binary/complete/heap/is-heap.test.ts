import {iterativeIsMaxHeap} from '@/data-structure/tree/binary/complete/heap/is-heap';

// yarn test src/data-structure/tree/binary/complete/heap/is-heap.test.ts
describe('isMaxHeap()', () => {
  it('예제는 만족해야한다.', () => {
    expect(iterativeIsMaxHeap([90, 15, 10, 7, 12, 2, 7, 3])).toBe(true);
    expect(iterativeIsMaxHeap([90, 1, 2, 7, 12, 2, 7, 3])).toBe(false);
  });

  it('빈배열은 true가 반환되야한다.', () => {
    expect(iterativeIsMaxHeap([])).toBe(true);
  });
});
