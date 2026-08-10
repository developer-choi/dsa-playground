/**
 * 최소본. 최대힙 하나만 지원한다 — 최소힙·비교 함수·우선순위 큐가 필요하면 heap.full.ts 를 쓴다.
 */
export class MaxHeap {
  private array: number[] = [];

  get length() {
    return this.array.length;
  }

  peek() {
    return this.array[0];
  }

  add(data: number) {
    this.array.push(data);

    let current = this.array.length - 1;

    while (current > 0) {
      const parent = Math.floor((current - 1) / 2);

      if (this.array[parent] >= this.array[current]) {
        break;
      }

      [this.array[parent], this.array[current]] = [this.array[current], this.array[parent]];
      current = parent;
    }
  }

  extractRoot() {
    if (this.array.length === 0) {
      return undefined;
    }

    const root = this.array[0];
    const last = this.array.pop() as number;

    if (this.array.length === 0) {
      return root;
    }

    this.array[0] = last;

    let current = 0;

    while (true) {
      const left = 2 * current + 1;
      const right = 2 * current + 2;
      let largest = current;

      if (left < this.array.length && this.array[left] > this.array[largest]) {
        largest = left;
      }

      if (right < this.array.length && this.array[right] > this.array[largest]) {
        largest = right;
      }

      if (largest === current) {
        break;
      }

      [this.array[current], this.array[largest]] = [this.array[largest], this.array[current]];
      current = largest;
    }

    return root;
  }
}
