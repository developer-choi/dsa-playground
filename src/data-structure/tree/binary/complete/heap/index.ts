import {ArrayBinaryTree, getFamilyIndexesFromCompleteBinaryTree} from '@/data-structure/tree/binary/complete/array';

/**
 * URL: https://www.geeksforgeeks.org/dsa/binary-heap/
 * URL: https://www.geeksforgeeks.org/javascript/min-heap-in-javascript/
 * URL: https://www.geeksforgeeks.org/javascript/max-heap-in-javascript/
 * Doc: https://docs.google.com/document/d/1dUt9mYfzFzZBdQBK-qvHiyi2_6nEScqxEQd0IdvJs8c/edit?tab=t.0
 */

// Heap은 직접 만들면 안되고 자식으로만 만들어야하니 abstract 키워드가 맞음.
export abstract class Heap extends ArrayBinaryTree<number> {
  constructor() {
    super();
  }

  /**
   * min / max 값을 얻는데 Time Complexity가 O(1) 이라는게 가장 큰 장점임.
   * array는 O(n)인데.
   */
  peek(): number | undefined {
    return this.array[0];
  }

  /**
   * Time Complexity: O(h) - heapifyDown() 때문에.
   */
  extractRoot(): number | undefined {
    if (this.array.length === 0) {
      return undefined;
    }

    const result = this.array[0];
    this.array[0] = this.array[this.array.length - 1];
    this.array.pop();
    this._length--;
    this.heapifyDown(0);
    return result;
  }

  /**
   * Time Complexity: O(h) - heapifyUp() 때문에.
   */
  add(data: number) {
    super.add(data);
    this.heapifyUp(this.array.length - 1);
  }

  /**
   * Time Complexity: O(h) - decreaseKey() 랑 extractMin() 때문에.
   */
  deleteKey(index: number) {
    if (index < 0 || index >= this.array.length) {
      throw new RangeError('Index out of bounds');
    }

    const root = this.peek();

    if (root === undefined) {
      return;
    }

    this.promoteToRoot(index);

    this.extractRoot();
  }

  // deleteKey() 에서 해당 index를 root로 보내기 위해 필요함.
  protected abstract promoteToRoot(index: number): void;

  // heapifyUp() 에서 사용하기 위해 반드시 오버라이딩 해야함.
  protected abstract shouldSwap(parentItem: number, childrenItem: number): boolean;

  /**
   * GFG 링크에서 insert() 예제에서 스왑하는 부분만 코드로 분리했음
   * Time Complexity: O(h) - 트리 높이만큼만 순회함.
   */
  protected heapifyUp(targetIndex: number) {
    let currentIndex = targetIndex;
    let parentIndex = this.getFamilyIndexes(currentIndex).parent;

    while (currentIndex > 0 && this.shouldSwap(this.array[parentIndex], this.array[currentIndex])) {
      [this.array[parentIndex], this.array[currentIndex]] = [this.array[currentIndex], this.array[parentIndex]];

      currentIndex = parentIndex;
      parentIndex = this.getFamilyIndexes(currentIndex).parent;
    }
  }

  /**
   * targetIndex를 제외한 나머지 index는 heap 조건을 만족한다고 가정 (GFG와 동일)
   * GFG 링크에서 MinHeapify() 메소드를 이름 바꿔서 구현했음.
   * Time Complexity: O(h) - 트리 높이만큼만 순회함.
   */
  protected heapifyDown(targetIndex: number) {
    let extremeIndex = this.getExtremeIndex(targetIndex);

    if (extremeIndex !== targetIndex) {
      [this.array[targetIndex], this.array[extremeIndex]] = [this.array[extremeIndex], this.array[targetIndex]];
      this.heapifyDown(extremeIndex);
    }
  }

  private getExtremeIndex(targetIndex: number) {
    const {left, right} = getFamilyIndexesFromCompleteBinaryTree(this.array, targetIndex);
    let extremeIndex = targetIndex;

    [left, right].forEach(index => {
      if (index !== -1 && this.shouldSwap(this.array[extremeIndex], this.array[index])) {
        extremeIndex = index;
      }
    });

    return extremeIndex;
  }
}

export class MinHeap extends Heap {
  constructor() {
    super();
  }

  protected shouldSwap(parentItem: number, childrenItem: number): boolean {
    return parentItem > childrenItem;
  }

  protected promoteToRoot(index: number): void {
    this.decreaseKey(index, Number.MIN_SAFE_INTEGER);
  }

  /**
   * Time Complexity: O(h) - bubbleUp() 때문에.
   */
  decreaseKey(index: number, value: number) {
    if (this.array[index] < value) {
      throw new TypeError(`${this.array[index]} 보다 작은 값을 value로 전달해야합니다.\n기존값=${this.array[index]}\n전달된 값=${value}`);
    }

    this.array[index] = value;
    this.heapifyUp(index);
  }
}

export class MaxHeap extends Heap {
  protected shouldSwap(parentItem: number, childrenItem: number): boolean {
    return parentItem < childrenItem;
  }

  protected promoteToRoot(index: number): void {
    this.increaseKey(index, Number.MAX_SAFE_INTEGER);
  }

  increaseKey(index: number, value: number) {
    if (this.array[index] > value) {
      throw new TypeError(`${this.array[index]} 보다 큰 값을 value로 전달해야합니다.\n기존값=${this.array[index]}\n전달된 값=${value}`);
    }

    this.array[index] = value;
    this.heapifyUp(index);
  }
}

export type HeapType = 'min' | 'max';
