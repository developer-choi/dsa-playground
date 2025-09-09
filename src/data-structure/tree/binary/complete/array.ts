import {CompleteBinaryTree} from '@/data-structure/tree/binary/complete/index';

export class ArrayBinaryTree<D> extends CompleteBinaryTree<D> {
  protected readonly array: D[];

  constructor() {
    super();
    this.array = [];
  }

  /**
   * URL: https://www.geeksforgeeks.org/dsa/binary-heap/
   * Doc: https://docs.google.com/document/d/1dUt9mYfzFzZBdQBK-qvHiyi2_6nEScqxEQd0IdvJs8c/edit?tab=t.0
   * parent는 index가 0이면 -1로 응답됨.
   */
  protected getFamilyIndex(index: number) {
    return {
      left: 2 * index + 1,
      right: 2 * index + 2,
      parent: Math.floor((index - 1) / 2),
    };
  }

  /**
   * Time Complexity: O(n)
   */
  protected _delete(data: D): D | undefined {
    // 여기서 최대 n번 순회
    const targetIndex = this.array.findIndex(item => item === data);

    if (targetIndex === -1) {
      return undefined;
    }

    const deletedData: D | undefined = this.array[targetIndex];
    const lastIndex = this.length - 1;

    if (targetIndex !== lastIndex) {
      this.array[targetIndex] = this.array[lastIndex];
    }

    /**
     * 여기서 배열 재배치 때문에 O(n)라고 생각할 수 있지만, 항상 마지막꺼를 삭제하기 때문에 O(1)임.
     *
     * 배열 재배치가 아니어도 O(1)인 이유는,
     * 0번째 요소를 삭제해서 O(n)이 걸린다고 따져봐도, 0번쨰 요소면 위에서 findIndex()할 때 O(1)이 나오기 때문에,
     * 총합은 여전히 O(1) 임.
     */
    this.array.splice(lastIndex, 1);

    return deletedData;
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
