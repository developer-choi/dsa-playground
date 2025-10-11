import {ArrayBinaryTree, getFamilyIndexesFromCompleteBinaryTree} from '@/data-structure/tree/binary/complete/array';

/**
 * URL: https://www.geeksforgeeks.org/dsa/binary-heap/
 * URL: https://www.geeksforgeeks.org/javascript/min-heap-in-javascript/
 * URL: https://www.geeksforgeeks.org/javascript/max-heap-in-javascript/
 * Doc: https://docs.google.com/document/d/1dUt9mYfzFzZBdQBK-qvHiyi2_6nEScqxEQd0IdvJs8c/edit?tab=t.0
 */

// Heap은 직접 만들면 안되고 자식으로만 만들어야하니 abstract 키워드가 맞음.
export abstract class Heap<T = number> extends ArrayBinaryTree<T> {
  protected readonly extractValue: (item: T) => number;

  protected constructor(extractValue?: (item: T) => number) {
    super();
    this.extractValue = extractValue ?? ((item: T) => item as number);
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

    const result = this.array[0];
    this.array[0] = this.array[this.array.length - 1];
    this.array.pop();
    this._length--;

    /**
     * heapifyUp()이 아닌 heapifyDown()을 해야하는 이유는
     * heap의 규칙을 깨뜨린 요소가 제일 위에 있기 때문에,
     * 아래로 내려가면서 규칙을 재확인 해야하기 때문.
     */
    this.heapifyDown(0);
    return result;
  }

  /**
   * Time Complexity: O(h) - heapifyUp() 때문에.
   */
  add(data: T): void {
    super.add(data);

    /**
     * heapifyDown()이 아닌 heapifyUp()을 해야하는 이유는
     * heap의 규칙을 깨뜨린 요소가 제일 뒤에 있기 때문에,
     * 위로 올라가면서 규칙을 재확인 해야하기 때문.
     */
    this.heapifyUp(this.array.length - 1);
  }

  /**
   * Time Complexity: O(h) - decreaseKey() 랑 extractMin() 때문에.
   */
  deleteKey(index: number) {
    if (index < 0 || index >= this.array.length) {
      throw new RangeError('Index out of bounds');
    }

    const lastIndex = this.array.length - 1;
    [this.array[index], this.array[lastIndex]] = [this.array[lastIndex], this.array[index]];
    this.array.pop();
    this._length--;

    if (this.array.length > 0 && index < this.array.length) {
      const parentIndex = this.getFamilyIndexes(index).parent;
      if (parentIndex >= 0 && this.shouldSwap(this.array[parentIndex], this.array[index])) {
        this.heapifyUp(index);
      } else {
        this.heapifyDown(index);
      }
    }
  }

  // heapifyUp() 에서 사용하기 위해 반드시 오버라이딩 해야함.
  protected abstract shouldSwap(parentItem: T, childrenItem: T): boolean;

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
  protected heapifyDown(targetIndex: number): void {
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

export class MinHeap<T = number> extends Heap<T> {
  constructor(extractValue?: (item: T) => number) {
    super(extractValue);
  }

  protected shouldSwap(parentItem: T, childrenItem: T): boolean {
    const parentValue = this.extractValue(parentItem);
    const childrenValue = this.extractValue(childrenItem);
    return parentValue > childrenValue;
  }

  /**
   * Time Complexity: O(h) - bubbleUp() 때문에.
   */
  decreaseKey(index: number, newItem: T): void {
    const oldValue = this.extractValue(this.array[index]);
    const newValue = this.extractValue(newItem);

    if (newValue > oldValue) {
      throw new TypeError(`새로운 키 값(${newValue})은 기존 키 값(${oldValue})보다 작아야 합니다.`);
    }

    this.array[index] = newItem;
    this.heapifyUp(index);
  }
}

export class MaxHeap<T = number> extends Heap<T> {
  constructor(extractValue?: (item: T) => number) {
    super(extractValue);
  }

  protected shouldSwap(parentItem: T, childrenItem: T): boolean {
    const parentValue = this.extractValue(parentItem);
    const childrenValue = this.extractValue(childrenItem);
    return parentValue < childrenValue;
  }

  increaseKey(index: number, newItem: T): void {
    const oldValue = this.extractValue(this.array[index]);
    const newValue = this.extractValue(newItem);

    if (newValue < oldValue) {
      throw new TypeError(`새로운 키 값(${newValue})은 기존 키 값(${oldValue})보다 커야 합니다.`);
    }

    this.array[index] = newItem;
    this.heapifyUp(index);
  }
}

export type HeapType = 'min' | 'max';
