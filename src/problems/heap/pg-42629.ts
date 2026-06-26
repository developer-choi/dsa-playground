/**
 * URL: https://school.programmers.co.kr/learn/courses/30/lessons/42629
 * Description: 라면공장 — 해외 공장에서 최소 몇 번 밀가루를 공급받아야 하는지 반환
 */
export function solution(stock: number, dates: number[], supplies: number[], k: number): number {
  const accumulated = {
    stock,
    count: 0
  };
  let supplyState = {
    available: new MaxHeap(),
    cursor: -1
  };

  while (accumulated.stock < k) {
    const maxSurviveDate = accumulated.stock;
    const lastDateIndex = dates.length - 1;
    const suppliableDateIndex = dates[lastDateIndex] <= maxSurviveDate ? lastDateIndex : dates.findIndex(date => maxSurviveDate < date) - 1;

    for(let i = supplyState.cursor + 1 ; i <= suppliableDateIndex ; i++) {
      supplyState.available.add(supplies[i]);
    }

    supplyState.cursor = suppliableDateIndex;

    const supplied = supplyState.available.extractRoot();

    if (supplied === undefined) {
      throw new TypeError('회사가 재고가 부족해서 버틸 수 없었고, 파산했어요');
    }

    accumulated.stock += supplied;
    accumulated.count++;
  }

  return accumulated.count;
}

class MaxHeap {
  array: number[];
  _length: number;
  comparator: (a: number, b: number) => number;

  constructor() {
    this.array = [];
    this._length = 0;
    this.comparator = (a: number, b: number) => a - b;
  }

  get length() {
    return this._length;
  }

  peek() {
    return this.array[0];
  }

  add(data: number) {
    this.array.push(data);
    this._length++;
    this.heapifyUp(this.array.length - 1);
  }

  extractRoot() {
    if (this.array.length === 0) {
      return undefined;
    }

    const result = this.array[0];
    const last = this.array.pop();
    this._length--;

    if (this.array.length > 0 && last !== undefined) {
      this.array[0] = last;
      this.heapifyDown(0);
    }

    return result;
  }

  getFamilyIndexes(index: number) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    const parent = Math.floor((index - 1) / 2);

    return {
      left: left >= this.array.length ? -1 : left,
      right: right >= this.array.length ? -1 : right,
      parent: parent < 0 ? -1 : parent,
    };
  }

  shouldSwap(parentItem: number, childrenItem: number) {
    return this.comparator(parentItem, childrenItem) < 0;
  }

  heapifyUp(targetIndex: number) {
    let currentIndex = targetIndex;
    let parentIndex = this.getFamilyIndexes(currentIndex).parent;

    while (currentIndex > 0 && this.shouldSwap(this.array[parentIndex], this.array[currentIndex])) {
      [this.array[parentIndex], this.array[currentIndex]] = [this.array[currentIndex], this.array[parentIndex]];
      currentIndex = parentIndex;
      parentIndex = this.getFamilyIndexes(currentIndex).parent;
    }
  }

  heapifyDown(targetIndex: number) {
    let extremeIndex = this.getExtremeIndex(targetIndex);

    if (extremeIndex !== targetIndex) {
      [this.array[targetIndex], this.array[extremeIndex]] = [this.array[extremeIndex], this.array[targetIndex]];
      this.heapifyDown(extremeIndex);
    }
  }

  getExtremeIndex(targetIndex: number) {
    const {left, right} = this.getFamilyIndexes(targetIndex);
    let extremeIndex = targetIndex;

    [left, right].forEach(index => {
      if (index !== -1 && this.shouldSwap(this.array[extremeIndex], this.array[index])) {
        extremeIndex = index;
      }
    });

    return extremeIndex;
  }

  increaseKey(index: number, newItem: number) {
    if (this.comparator(newItem, this.array[index]) < 0) {
      throw new TypeError(`New item (${newItem}) must be larger than current item (${this.array[index]})`);
    }
    this.array[index] = newItem;
    this.heapifyUp(index);
  }
}