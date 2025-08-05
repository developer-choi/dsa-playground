import {BinaryTree, BinaryTreeNode} from './index';

// Doc: https://docs.google.com/document/d/1hmQ93jf-hPjph7pKNf1hPJkwa-THOQS3iI7lYYnExTM/edit?tab=t.0
export class LinkedListBinaryTree<D> extends BinaryTree<D> {
  private root: BinaryTreeNode<D> | undefined;

  /**
   * URL: https://www.geeksforgeeks.org/dsa/insertion-in-a-binary-tree-in-level-order/
   *
   * Time Complexity: O(n), 최악의 경우 제일 우측 제일 하단 노드에 추가할 때 까지 순회를 해야하니까.
   * Auxiliary Space: O(n), 사유는 아래 traversal 주석 참고.
   */
  protected _add(data: D) {
    if (!this.root) {
      this.root = new BinaryTreeNode<D>(data);
      return;
    }

    for (const {node} of this.traverse()) {
      if (!node.left) {
        node.left = new BinaryTreeNode<D>(data);
        return;
      } else if (!node.right) {
        node.right = new BinaryTreeNode<D>(data);
        return;
      }
    }
  }

  // URL: https://www.geeksforgeeks.org/dsa/deletion-binary-tree/
  protected _delete(data: D): D | undefined {
    let lastIndex = this.length - 1;
    let deletedNode: BinaryTreeNode<D> | undefined;
    let lastIterationItem: InternalInterationItem<D> | undefined;

    for (const item of this.traverse()) {
      // 최초로 데이터가 똑같은 경우에만 할당
      if (item.node.data === data && !deletedNode) {
        deletedNode = item.node;
      }

      if (item.index === lastIndex) {
        lastIterationItem = item;
      }
    }

    const result = deletedNode?.data;

    if (deletedNode && lastIterationItem) {
      deletedNode.data = lastIterationItem.node.data;

      if (lastIterationItem.parent) {
        lastIterationItem.parent.node[lastIterationItem.parent.direction] = undefined;

      } else {
        this.root = undefined;
      }
    }

    return result;
  }

  /**
   * URL: https://www.geeksforgeeks.org/dsa/level-order-tree-traversal/#approach-1-using-queue-iterarive-on-time-and-on-space
   * Doc: https://docs.google.com/document/d/1MzkBVNfFktmMl-0uR1oO31fDxC7LM47cI0Q8Kv6PWxU/edit?tab=t.0
   *
   * Time Complexity: O(n) ==> 모든 노드 1번씩 순회하는데 전부 1번씩만 순회했음.
   * Auxiliary Space: O(n/2) ==> O(n), 가장 메모리가 클 때는 Complete Binary Tree에서 가장 마지막 레벨 순회할 때, 이 때 노드갯수는 전체갯수의 약 1/2 임.
   */
  private* traverse(): Generator<{node: BinaryTreeNode<D>, parent: InternalInterationItem<D>['parent'], level: number, index: number}, void, undefined> {
    if (!this.root) {
      return;
    }

    // 탐색해야하는 노드들
    const nextSearchQueue: InternalInterationItem<D>[] = [{node: this.root, parent: undefined}];
    let level = 0;
    let index = 0;

    while (nextSearchQueue.length > 0) {
      const iterativeCount = nextSearchQueue.length;

      for (let i = 0; i < iterativeCount; i++) {
        const {node, parent} = nextSearchQueue.shift() as InternalInterationItem<D>;

        yield {node, parent, level, index};
        index++;

        // 다음 라벨에 또 순회해야하니 다음 레벨 노드들 저장
        if (node.left) {
          nextSearchQueue.push({node: node.left, parent: {node, direction: 'left'}});
        }

        if (node.right) {
          nextSearchQueue.push({node: node.right, parent: {node, direction: 'right'}});
        }
      }
      level++;
    }
  }

  public* [Symbol.iterator](): Generator<{data: D, level: number, index: number}, void, undefined> {
    for (const {node, level, index} of this.traverse()) {
      yield {data: node.data, level, index};
    }
  }
}

interface InternalInterationItem<D> {
  node: BinaryTreeNode<D>,
  parent: undefined | {
    node: BinaryTreeNode<D>;
    direction: 'left' | 'right';
  };
}
