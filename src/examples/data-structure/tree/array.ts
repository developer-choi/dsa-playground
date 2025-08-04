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

  toArray(): D[][] {
    if (this.array.length === 0) {
      return [];
    }

    const result: D[][] = [];

    for (const {data, level} of this) {
      if (result[level]) {
        result[level].push(data);

      } else {
        result[level] = [data];
      }
    }

    return result;
  }

  public* [Symbol.iterator](): Generator<{data: D; level: number}, void, undefined> {
    yield {data: this.array[0], level: 0};

    for (let i = 1; i < this.array.length; i++) {
      const level = Math.floor(Math.log2(i + 1));
      const data = this.array[i];

      yield {data, level};
    }
  }
}
