/**
 * URL: https://www.geeksforgeeks.org/dsa/implement-stack-using-array/
 * Doc: https://docs.google.com/document/d/11a-3VHMgXMuZQSidzpQUkyJ0fz3JEVDSBwlg8KZS_Hg/edit?tab=t.0#heading=h.ika3ybx2u5yu
 */
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
