class EssentialMinHeap {
  constructor(comparator) {
    this.array = [];
    this._length = 0;
    this.comparator = comparator ?? ((a, b) => a - b);
  }

  get length() {
    return this._length;
  }

  peek() {
    return this.array[0];
  }

  add(data) {
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

  deleteKey(index) {
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

  getFamilyIndexes(index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    const parent = Math.floor((index - 1) / 2);

    return {
      left: left >= this.array.length ? -1 : left,
      right: right >= this.array.length ? -1 : right,
      parent: parent < 0 ? -1 : parent,
    };
  }

  shouldSwap(parentItem, childrenItem) {
    return this.comparator(parentItem, childrenItem) > 0;
  }

  heapifyUp(targetIndex) {
    let currentIndex = targetIndex;
    let parentIndex = this.getFamilyIndexes(currentIndex).parent;

    while (currentIndex > 0 && this.shouldSwap(this.array[parentIndex], this.array[currentIndex])) {
      [this.array[parentIndex], this.array[currentIndex]] = [this.array[currentIndex], this.array[parentIndex]];
      currentIndex = parentIndex;
      parentIndex = this.getFamilyIndexes(currentIndex).parent;
    }
  }

  heapifyDown(targetIndex) {
    let extremeIndex = this.getExtremeIndex(targetIndex);

    if (extremeIndex !== targetIndex) {
      [this.array[targetIndex], this.array[extremeIndex]] = [this.array[extremeIndex], this.array[targetIndex]];
      this.heapifyDown(extremeIndex);
    }
  }

  getExtremeIndex(targetIndex) {
    const {left, right} = this.getFamilyIndexes(targetIndex);
    let extremeIndex = targetIndex;

    [left, right].forEach(index => {
      if (index !== -1 && this.shouldSwap(this.array[extremeIndex], this.array[index])) {
        extremeIndex = index;
      }
    });

    return extremeIndex;
  }

  decreaseKey(index, newItem) {
    if (this.comparator(newItem, this.array[index]) > 0) {
      throw new TypeError(`New item (${newItem}) must be smaller than current item (${this.array[index]})`);
    }
    this.array[index] = newItem;
    this.heapifyUp(index);
  }
}

class EssentialMaxHeap {
  constructor(comparator) {
    this.array = [];
    this._length = 0;
    this.comparator = comparator ?? ((a, b) => a - b);
  }

  get length() {
    return this._length;
  }

  peek() {
    return this.array[0];
  }

  add(data) {
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

  deleteKey(index) {
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

  getFamilyIndexes(index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    const parent = Math.floor((index - 1) / 2);

    return {
      left: left >= this.array.length ? -1 : left,
      right: right >= this.array.length ? -1 : right,
      parent: parent < 0 ? -1 : parent,
    };
  }

  shouldSwap(parentItem, childrenItem) {
    return this.comparator(parentItem, childrenItem) < 0;
  }

  heapifyUp(targetIndex) {
    let currentIndex = targetIndex;
    let parentIndex = this.getFamilyIndexes(currentIndex).parent;

    while (currentIndex > 0 && this.shouldSwap(this.array[parentIndex], this.array[currentIndex])) {
      [this.array[parentIndex], this.array[currentIndex]] = [this.array[currentIndex], this.array[parentIndex]];
      currentIndex = parentIndex;
      parentIndex = this.getFamilyIndexes(currentIndex).parent;
    }
  }

  heapifyDown(targetIndex) {
    let extremeIndex = this.getExtremeIndex(targetIndex);

    if (extremeIndex !== targetIndex) {
      [this.array[targetIndex], this.array[extremeIndex]] = [this.array[extremeIndex], this.array[targetIndex]];
      this.heapifyDown(extremeIndex);
    }
  }

  getExtremeIndex(targetIndex) {
    const {left, right} = this.getFamilyIndexes(targetIndex);
    let extremeIndex = targetIndex;

    [left, right].forEach(index => {
      if (index !== -1 && this.shouldSwap(this.array[extremeIndex], this.array[index])) {
        extremeIndex = index;
      }
    });

    return extremeIndex;
  }

  increaseKey(index, newItem) {
    if (this.comparator(newItem, this.array[index]) < 0) {
      throw new TypeError(`New item (${newItem}) must be larger than current item (${this.array[index]})`);
    }
    this.array[index] = newItem;
    this.heapifyUp(index);
  }
}