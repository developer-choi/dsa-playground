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
  abstract toArray(): D[][];

  public abstract [Symbol.iterator](): Generator<{data: D, level: number}, void, undefined>;
}
