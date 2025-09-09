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

    let i = this.array.length - 1;
    while (i > 0 && this.array[this.getFamilyIndex(i).parent] > this.array[i]) {
      const parentIndex = this.getFamilyIndex(i).parent;

      [this.array[parentIndex], this.array[i]] = [this.array[i], this.array[parentIndex]];

      i = this.getFamilyIndex(i).parent;
    }
  }
}
