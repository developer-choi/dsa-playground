import Stack from '@/examples/data-structure/stack/index';

/**
 * URL: https://www.geeksforgeeks.org/dsa/implement-stack-using-array/
 * Doc: https://docs.google.com/document/d/11a-3VHMgXMuZQSidzpQUkyJ0fz3JEVDSBwlg8KZS_Hg/edit?tab=t.0#heading=h.ika3ybx2u5yu
 */
export default class StackUsingArray<D> extends Stack<D> {
  private readonly array: D[];
  readonly capacity: number;

  constructor(capacity: number) {
    super();
    this.array = [];
    this.capacity = capacity;
  }

  get length(): number {
    return this.array.length;
  }

  push(data: D) {
    if (this.array.length >= this.capacity) {
      throw new RangeError('Stack overflow');
    }

    this.array.push(data);
  }

  pop() {
    if (this.array.length <= 0) {
      throw new RangeError('Stack underflow');
    }

    return this.array.pop() as D;
  }

  peek() {
    return this.array[this.array.length - 1];
  }

  toArray(): D[] {
    return this.array;
  }
}
