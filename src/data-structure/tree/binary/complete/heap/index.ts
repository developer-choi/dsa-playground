import {ArrayBinaryTree} from '@/data-structure/tree/binary/complete/array';

/**
 * URL: https://www.geeksforgeeks.org/dsa/binary-heap/
 * URL: https://www.geeksforgeeks.org/javascript/min-heap-in-javascript/
 * URL: https://www.geeksforgeeks.org/javascript/max-heap-in-javascript/
 * Doc: https://docs.google.com/document/d/1dUt9mYfzFzZBdQBK-qvHiyi2_6nEScqxEQd0IdvJs8c/edit?tab=t.0
 */

// Heap은 직접 만들면 안되고 자식으로만 만들어야하니 abstract 키워드가 맞음.
export abstract class Heap<T = number> extends ArrayBinaryTree<T> {
  protected readonly comparator: Comparator<T>;

  protected constructor(comparator?: Comparator<T>) {
    super();
    this.comparator = comparator ?? ((a: T, b: T) => (a as number) - (b as number));
  }

  /**
   * min / max 값을 얻는데 Time Complexity가 O(1) 이라는게 가장 큰 장점임.
   * array는 O(n)인데.
   */
  peek(): T | undefined {
    return this.array[0];
  }

  /**
   * Time Complexity: O(h) - heapifyDown() 때문에.
   */
  extractRoot(): T | undefined {
    if (this.array.length === 0) {
      return undefined;
    }

    const lastIndex = this.length - 1;
    this.swap(0, lastIndex);
    const result = this.array.pop();
    this._length--;

    if (this.length > 0) {
      this.heapifyDown(0);
    }

    return result;
  }

  /**
   * Time Complexity: O(h) - heapifyUp() 때문에.
   */
  add(data: T): void {
    super.add(data);
    this.heapifyUp(this.array.length - 1);
  }

  /**
   * Time Complexity: O(h) - decreaseKey() 랑 extractMin() 때문에.
   */
  deleteKey(index: number): void {
    if (index < 0 || index >= this.array.length) {
      throw new RangeError('Index out of bounds');
    }

    if (this.length === 1) {
      this.array.pop();
      this._length--;
      return;
    }

    const lastIndex = this.length - 1;
    this.swap(index, lastIndex);
    this.array.pop();
    this._length--;

    if (this.length > 0 && index < this.length) {
      const itemToAdjust = this.array[index];
      const parentIndex = this.getFamilyIndexes(index).parent;

      if (index > 0 && this.shouldSwap(this.array[parentIndex], itemToAdjust)) {
        this.heapifyUp(index);
      } else {
        this.heapifyDown(index);
      }
    }
  }

  // heapifyUp/Down 에서 사용하기 위해 반드시 오버라이딩 해야함.
  protected abstract shouldSwap(parentItem: T, childrenItem: T): boolean;

  /**
   * Time Complexity: O(log n)
   */
  protected heapifyUp(targetIndex: number) {
    let currentIndex = targetIndex;
    let parentIndex = this.getFamilyIndexes(currentIndex).parent;

    while (currentIndex > 0 && this.shouldSwap(this.array[parentIndex], this.array[currentIndex])) {
      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
      parentIndex = this.getFamilyIndexes(currentIndex).parent;
    }
  }

  /**
   * Time Complexity: O(log n)
   */
  protected heapifyDown(targetIndex: number): void {
    let currentIndex = targetIndex;

    while (true) {
      const {left, right} = this.getFamilyIndexes(currentIndex);
      let extremeIndex = currentIndex;

      if (left !== -1 && this.shouldSwap(this.array[extremeIndex], this.array[left])) {
        extremeIndex = left;
      }

      if (right !== -1 && this.shouldSwap(this.array[extremeIndex], this.array[right])) {
        extremeIndex = right;
      }

      if (extremeIndex === currentIndex) {
        break;
      }

      this.swap(currentIndex, extremeIndex);
      currentIndex = extremeIndex;
    }
  }

  protected swap(i: number, j: number): void {
    [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
  }
}

export class MinHeap<T = number> extends Heap<T> {
  constructor(comparator?: Comparator<T>) {
    super(comparator);
  }

  protected shouldSwap(parentItem: T, childrenItem: T): boolean {
    // comparator 결과가 양수이면 (parent > child), 스왑한다.
    return this.comparator(parentItem, childrenItem) > 0;
  }

  /**
   * 특정 인덱스의 키(값)를 감소시킵니다.
   * `heapifyUp`을 사용하여 힙 속성을 복원합니다.
   * Time Complexity: O(log n)
   */
  decreaseKey(index: number, newItem: T): void {
    if (index < 0 || index >= this.length) {
      throw new RangeError('Index out of bounds');
    }

    const currentItem = this.array[index];
    // comparator(newItem, currentItem) > 0 이면 newItem이 더 큰 것이므로 에러
    if (this.comparator(newItem, currentItem) > 0) {
      throw new Error('New item must be smaller than or equal to the current item.');
    }

    this.array[index] = newItem;
    this.heapifyUp(index);
  }
}

export class MaxHeap<T = number> extends Heap<T> {
  constructor(comparator?: Comparator<T>) {
    super(comparator);
  }

  protected shouldSwap(parentItem: T, childrenItem: T): boolean {
    // comparator 결과가 음수이면 (parent < child), 스왑한다.
    return this.comparator(parentItem, childrenItem) < 0;
  }

  /**
   * 특정 인덱스의 키(값)를 증가시킵니다.
   * `heapifyDown`을 사용하여 힙 속성을 복원합니다.
   * Time Complexity: O(log n)
   */
  increaseKey(index: number, newItem: T): void {
    if (index < 0 || index >= this.length) {
      throw new RangeError('Index out of bounds');
    }

    const currentItem = this.array[index];
    // comparator(newItem, currentItem) < 0 이면 newItem이 더 작은 것이므로 에러
    if (this.comparator(newItem, currentItem) < 0) {
      throw new Error('New item must be larger than or equal to the current item.');
    }

    this.array[index] = newItem;
    this.heapifyDown(index);
  }
}

export type HeapType = 'min' | 'max';

/**
 * 비교 함수의 타입 정의.
 * @returns {number}
 * - 음수: a가 b보다 작음
 * - 0: a와 b가 같음
 * - 양수: a가 b보다 큼
 */
export type Comparator<T> = (a: T, b: T) => number;
