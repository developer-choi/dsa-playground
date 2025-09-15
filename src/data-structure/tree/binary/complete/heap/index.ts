import {ArrayBinaryTree, getFamilyIndexesFromCompleteBinaryTree} from '@/data-structure/tree/binary/complete/array';

/**
 * URL: https://www.geeksforgeeks.org/dsa/binary-heap/
 * Doc: https://docs.google.com/document/d/1dUt9mYfzFzZBdQBK-qvHiyi2_6nEScqxEQd0IdvJs8c/edit?tab=t.0
 */
export default class MinHeap extends ArrayBinaryTree<number> {
  constructor() {
    super();
  }

  add(data: number) {
    super.add(data);
    this.bubbleUp(this.array.length - 1);
  }

  decreaseKey(index: number, value: number) {
    if (this.array[index] < value) {
      throw new TypeError(`${this.array[index]} 보다 작은 값을 value로 전달해야합니다.\n기존값=${this.array[index]}\n전달된 값=${value}`);
    }

    this.array[index] = value;
    this.bubbleUp(index);
  }

  extractMin(): number | undefined {
    if (this.array.length === 0) {
      return undefined;
    }

    const result = this.array[0];
    this.array[0] = this.array[this.array.length - 1];
    this.array.pop();
    this._length--;
    this.bubbleDown(0);
    return result;
  }

  // GFG 링크에서 insert() 예제에서 스왑하는 부분만 코드로 분리했음
  private bubbleUp(targetIndex: number) {
    let currentIndex = targetIndex;
    let parentIndex = this.getFamilyIndexes(currentIndex).parent;

    while (currentIndex > 0 && this.array[parentIndex] > this.array[currentIndex]) {
      [this.array[parentIndex], this.array[currentIndex]] = [this.array[currentIndex], this.array[parentIndex]];

      currentIndex = parentIndex;
      parentIndex = this.getFamilyIndexes(currentIndex).parent;
    }
  }

  /**
   * targetIndex를 제외한 나머지 index는 heap 조건을 만족한다고 가정 (GFG와 동일)
   * GFG 링크에서 MinHeapify() 메소드를 이름 바꿔서 구현했음.
   */
  private bubbleDown(targetIndex: number) {
    let smallestIndex = this.getSmallestIndex(targetIndex);

    if (smallestIndex !== targetIndex) {
      [this.array[targetIndex], this.array[smallestIndex]] = [this.array[smallestIndex], this.array[targetIndex]];
      this.bubbleDown(smallestIndex);
    }
  }

  private getSmallestIndex(targetIndex: number) {
    const {left, right} = getFamilyIndexesFromCompleteBinaryTree(this.array, targetIndex);
    let smallestIndex = targetIndex;

    [left, right].forEach(index => {
      if (index !== -1 && this.array[index] < this.array[smallestIndex]) {
        smallestIndex = index;
      }
    });

    return smallestIndex;
  }

}

export type HeapType = 'min' | 'max';
