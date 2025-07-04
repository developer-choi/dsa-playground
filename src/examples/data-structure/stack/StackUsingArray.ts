export default class StackUsingArray {
  private readonly array: number[];
  readonly capacity: number;

  constructor(capacity: number) {
    this.array = [];
    this.capacity = capacity;
  }

  push(value: number) {
    if (this.array.length >= this.capacity) {
      throw new RangeError('Stack overflow');
    }

    this.array.push(value);
  }

  pop() {
    if (this.array.length <= 0) {
      throw new RangeError('Stack underflow');
    }

    return this.array.pop() as number;
  }

  peek() {
    return this.array[this.array.length - 1];
  }
}
