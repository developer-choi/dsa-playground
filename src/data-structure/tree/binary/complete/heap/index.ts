import {ArrayBinaryTree} from '@/data-structure/tree/binary/complete/array';

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

  private bubbleUp(initialIndex: number) {
    let currentIndex = initialIndex;
    let parentIndex = this.getFamilyIndexes(currentIndex).parent;

    while (currentIndex > 0 && this.array[parentIndex] > this.array[currentIndex]) {
      [this.array[parentIndex], this.array[currentIndex]] = [this.array[currentIndex], this.array[parentIndex]];

      currentIndex = parentIndex;
      parentIndex = this.getFamilyIndexes(currentIndex).parent;
    }
  }
}

export type HeapType = 'min' | 'max';
