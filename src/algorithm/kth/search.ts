import {Heap, MaxHeap, MinHeap} from '@/data-structure/tree/binary/complete/heap';

/**
 * Doc: https://docs.google.com/document/d/1kPMKSQSaUhiVBOv7nfBv-ah8zsnPXWUA-q0L6hVsqNo/edit?tab=t.0#heading=h.tovxn9cedrmb
 * Official: https://www.geeksforgeeks.org/dsa/find-second-largest-element-array/
 * 여기서 [Expected Approach] One Pass Search 를 구현한 코드임.
 *
 * @return 배열의 길이가 1 이하면 null이 반환됨.
 */
export function findSecondLargestElement(array: number[]): number | null {
  if (array.length <= 1) {
    return null;
  }

  let largest: number | null = array[0];
  let secondLargest: number | null = null;

  /**
   * 순회 하면서
   * largest 보다 크면
   * largest에 있던걸 secondLargest에 넣고
   * largest에 그걸 넣기
   */
  for(let i = 1 ; i < array.length ; i++) {
    const value = array[i];

    if (value > largest) {
      secondLargest = largest;
      largest = value;

      // if에서 value / largest 비교했지만 여기서 또 하는 이유는, value === largest인 케이스가 있어서 이걸 제외하기 위해.
    } else if (secondLargest === null || (value < largest && value > secondLargest)) {
      secondLargest = value;
    }
  }

  return secondLargest;
}

/**
 * URL: https://www.geeksforgeeks.org/dsa/kth-smallest-largest-element-in-unsorted-array/
 * URL: https://www.geeksforgeeks.org/dsa/kth-largest-element-in-an-array/
 * Doc: https://docs.google.com/document/d/17pni-XHnVVrQ7ofF0dbzfwOM2db3_JKHIevc8vrkUtA/edit?tab=t.0
 * GFG 스펙처럼, 중복을 허용함. [1, 1, 2, 2] 에서 2번째로 큰값을 구하려고 하면 1이 아니라 2가 반환됨.
 * Time Complexity: O(n * log(k)) - 순회하는데 O(n), Heap에 추가하는거랑 extractRoot() 하는거랑 둘 다 O(h) = O(log(k)), 두개를 곱해서 이렇게됨.
 * 이걸 전체 한번 정렬해서 하는 방법은 O(nlogn)인데, 비교하면 log n이랑 log k 크기 차이만큼 효율차이가 발생함.
 */
export function findKthOrderValue(array: number[], order: number, type: 'smallest' | 'largest') {
  const HeapClass = HEAP_CLASSES[type];
  const heap = new HeapClass();

  for (const data of array) {
    heap.add(data);

    if (heap.length > order) {
      heap.extractRoot();
    }
  }

  return heap.peek();
}

export type OrderType = 'smallest' | 'largest';

const HEAP_CLASSES: Record<OrderType, new () => Heap> = {
  smallest: MaxHeap,
  largest: MinHeap,
};
