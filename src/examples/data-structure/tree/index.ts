export class BinaryTreeNode<D> {
  left: BinaryTreeNode<D> | undefined;
  right: BinaryTreeNode<D> | undefined;
  data: D;

  constructor(data: D) {
    this.data = data;
  }
}

export abstract class BinaryTree<D> {
  private _length: number;

  constructor() {
    this._length = 0;
  }

  get length(): number {
    return this._length;
  }

  add(data: D) {
    this._length++;

    this._add(data);
  }

  protected abstract _add(data: D): void;

  toArray(): D[][] {
    const result: D[][] = [];

    for (const {data, level} of this) {
      if (!result[level]) {
        result[level] = [data];
      } else {
        result[level].push(data);
      }
    }

    return result;
  }

  public abstract [Symbol.iterator](): Generator<{data: D, level: number, index: number}, void, undefined>;
}
