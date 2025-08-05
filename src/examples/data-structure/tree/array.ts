import {BinaryTree} from '@/examples/data-structure/tree/index';

export class ArrayBinaryTree<D> extends BinaryTree<D> {
  readonly array: D[];

  constructor() {
    super();
    this.array = [];
  }

  protected _add(data: D): void {
    this.array.push(data);
  }

  public* [Symbol.iterator](): Generator<{data: D; level: number, index: number}, void, undefined> {
    if (this.array.length === 0) {
      return;
    }

    yield {data: this.array[0], level: 0, index: 0};

    for (let i = 1; i < this.array.length; i++) {
      const level = Math.floor(Math.log2(i + 1));
      const data = this.array[i];

      yield {data, level, index: i};
    }
  }
}
