export class BinaryTreeNode<D> {
  left: BinaryTreeNode<D> | undefined;
  right: BinaryTreeNode<D> | undefined;
  data: D;

  constructor(data: D) {
    this.data = data;
  }
}

/**
 * Doc: https://docs.google.com/document/d/1hmQ93jf-hPjph7pKNf1hPJkwa-THOQS3iI7lYYnExTM/edit?tab=t.0#heading=h.tv71ehud6a1w
 */
export abstract class BinaryTree<D> {
  private _length: number;

  constructor() {
    this._length = 0;
  }

  get length(): number {
    return this._length;
  }

  // URL: https://www.geeksforgeeks.org/dsa/find-the-maximum-depth-or-height-of-a-tree/
  get height(): number | -1 {
    if (this._length === 0) {
      return -1;
    }

    return Math.floor(Math.log2(this._length));
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

  /**
   * @description BFS로 순회하면서 제일 먼저 발견되는 노드 1개만 삭제
   * @return {undefined} 같은 data로 된 노드가 없는 경우
   */
  delete(data: D): D | undefined {
    const deletedData = this._delete(data);

    if (deletedData) {
      this._length--;
    }

    return deletedData;
  }

  protected abstract _delete(data: D): D | undefined;

  public abstract [Symbol.iterator](): Generator<{data: D, level: number, index: number}, void, undefined>;
}
